import {useEffect, useMemo, useState} from "react";
import {BaseContainer} from "@/lib/core/container/BaseInteractiveContainer";
import "reflect-metadata";


// Interfaccia generica per i metodi del container
export interface ContainerMethods<T> {
  [key: string]: (...args: any[]) => any;
}

// Tipo che rappresenta il costruttore di una classe che estende BaseContainer<T>
type ContainerClass<T, M extends ContainerMethods<T>> = new (...args: any[]) => BaseContainer<T> & M;

// @ts-ignore
// @ts-ignore
/**
 * Hook generico per utilizzare un container che estende BaseContainer
 * @template T - Tipo dei dati contenuti nel container
 * @template M - Interfaccia che descrive i metodi aggiuntivi del container
 * @param ContainerClass - Classe del container
 * @param injectContainer - Istanza del container iniettata
 * @returns Un oggetto contenente i dati correnti e i metodi tipizzati del container
 */

export function useContainer<T, M extends ContainerMethods<T>>(
  ContainerClass: ContainerClass<T, M>,
  //@ts-ignore
  injectContainer: InstanceType<ContainerClass>
): { data: T } & M {
  const [data, setData] = useState<T>(() => injectContainer.getCurrentValue());

  useEffect(() => {
    const subscription = injectContainer.asObservable().subscribe(setData);
    return () => subscription.unsubscribe();
  }, [injectContainer]);

  const methods = useMemo(() => {
    const containerMethods: M = {} as M;

    Object.getOwnPropertyNames(Object.getPrototypeOf(injectContainer)).forEach((name) => {
      if (name !== 'constructor' && name !== 'updateData' && name !== 'asObservable' && name !== 'getCurrentValue') {
        const method = (injectContainer as any)[name];
        if (typeof method === 'function') {
          containerMethods[name as keyof M] = method.bind(injectContainer);
        }
      }
    });

    return containerMethods;
  }, [injectContainer]);

  return { data, ...methods };
}