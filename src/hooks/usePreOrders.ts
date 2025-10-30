import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/firebase/AuthProvider';

export type PreOrder = {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  description?: string;
  createdAt: number;
};

const getStorageKey = (uid: string | undefined) => `preorders_${uid || 'guest'}`;

const loadPreOrders = (uid: string | undefined): PreOrder[] => {
  try {
    const raw = localStorage.getItem(getStorageKey(uid));
    return raw ? (JSON.parse(raw) as PreOrder[]) : [];
  } catch {
    return [];
  }
};

const savePreOrders = (uid: string | undefined, items: PreOrder[]) => {
  try {
    localStorage.setItem(getStorageKey(uid), JSON.stringify(items));
  } catch {
    // ignore
  }
};

export function usePreOrders() {
  const { user } = useAuth();
  const uid = user?.uid;
  const [preOrders, setPreOrders] = useState<PreOrder[]>([]);

  useEffect(() => {
    setPreOrders(loadPreOrders(uid));
  }, [uid]);

  const addPreOrder = useCallback(
    (input: Omit<PreOrder, 'id' | 'createdAt'>) => {
      const newItem: PreOrder = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: Date.now(),
        ...input,
      };
      setPreOrders((prev) => {
        const next = [newItem, ...prev];
        savePreOrders(uid, next);
        return next;
      });
      return newItem;
    },
    [uid]
  );

  const removePreOrder = useCallback(
    (id: string) => {
      setPreOrders((prev) => {
        const next = prev.filter((p) => p.id !== id);
        savePreOrders(uid, next);
        return next;
      });
    },
    [uid]
  );

  const clearAll = useCallback(() => {
    setPreOrders([]);
    savePreOrders(uid, []);
  }, [uid]);

  const count = useMemo(() => preOrders.length, [preOrders]);

  return { preOrders, addPreOrder, removePreOrder, clearAll, count };
}


