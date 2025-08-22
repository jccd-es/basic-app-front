import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';
    
    // Crear conexión única
    socketRef.current = io(socketUrl);
    console.log('Socket conectado globalmente:', socketUrl);

    // Cleanup al desmontar la app
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        console.log('Socket desconectado globalmente');
      }
    };
  }, []);

  const emit = (eventName, data) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, data);
    }
  };

  const on = (eventName, handler) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, handler);
      
      // Retornar función de cleanup
      return () => {
        if (socketRef.current) {
          socketRef.current.off(eventName, handler);
        }
      };
    }
    return () => {};
  };

  const off = (eventName, handler) => {
    if (socketRef.current) {
      socketRef.current.off(eventName, handler);
    }
  };

  return (
    <SocketContext.Provider value={{ 
      socket: socketRef.current, 
      emit, 
      on, 
      off,
      isConnected: socketRef.current?.connected || false 
    }}>
      {children}
    </SocketContext.Provider>
  );
};