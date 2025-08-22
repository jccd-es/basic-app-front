import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const socketRef = useRef(null);
  const listenersRef = useRef(new Map());

  // Inicializar socket una sola vez
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';
    
    if (!socketRef.current) {
      socketRef.current = io(socketUrl);
      console.log('Socket conectado:', socketUrl);
    }

    // Cleanup final al desmontar el hook
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        listenersRef.current.clear();
        console.log('Socket desconectado');
      }
    };
  }, []); // Sin dependencias para que solo se ejecute una vez

  // Función para emitir eventos
  const emit = useCallback((eventName, data) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, data);
    }
  }, []);

  // Función para añadir listeners
  const on = useCallback((eventName, handler) => {
    if (socketRef.current) {
      // Remover listener anterior si existe
      const existingHandler = listenersRef.current.get(eventName);
      if (existingHandler) {
        socketRef.current.off(eventName, existingHandler);
      }

      // Añadir nuevo listener
      socketRef.current.on(eventName, handler);
      listenersRef.current.set(eventName, handler);
    }
  }, []);

  // Función para remover listeners
  const off = useCallback((eventName, handler) => {
    if (socketRef.current) {
      socketRef.current.off(eventName, handler);
      listenersRef.current.delete(eventName);
    }
  }, []);

  return {
    socket: socketRef.current,
    emit,
    on,
    off,
    isConnected: socketRef.current?.connected || false
  };
};

export default useSocket;