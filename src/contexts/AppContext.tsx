
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Product, CartItem, User, Order, PointsHistoryEntry, UpdateUserPayload, UpdateProductPayload } from '@/lib/types';
import { MOCK_PRODUCTS, MOCK_USERS as INITIAL_MOCK_USERS, MOCK_ORDERS, MOCK_POINTS_HISTORY } from '@/lib/data';

interface AppContextType {
  products: Product[];
  user: User | null;
  orders: Order[];
  pointsHistory: PointsHistoryEntry[];
  cart: CartItem[];
  isAppLoaded: boolean;
  login: (identifier: string, password?: string) => void;
  logout: () => void;
  register: (name: string, email: string, profilePicture?: string, password?: string) => void;
  updateUser: (payload: UpdateUserPayload) => void;
  deleteAccount: (password: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  isPreviouslyOrdered: (productId: string) => boolean;
  redeemPoints: (productId: string, points: number) => void;
  updatePassword: (currentPassword: string, newPassword: string) => void;
  requestPasswordReset: (email: string) => void;
  updateProduct: (productId: string, payload: UpdateProductPayload) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [MOCK_USERS, setMockUsers] = useState<User[]>(INITIAL_MOCK_USERS);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointsHistoryEntry[]>([]);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('aroma-products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(MOCK_PRODUCTS);
      }

      const storedUsers = localStorage.getItem('aroma-users');
       if (storedUsers) {
        setMockUsers(JSON.parse(storedUsers));
      } else {
        setMockUsers(INITIAL_MOCK_USERS);
      }

      const storedCart = localStorage.getItem('aroma-cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      
      const storedUser = localStorage.getItem('aroma-user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        const mockUser = (JSON.parse(storedUsers || '[]') as User[]).find(u => u.id === parsedUser.id);
        
        if (mockUser) {
            const fullUser = { ...parsedUser, password: mockUser.password || parsedUser.password };
            setUser(fullUser);

            const userOrders = MOCK_ORDERS.filter(o => o.userId === fullUser.id);
            setOrders(userOrders);

            const userPointsHistory = MOCK_POINTS_HISTORY.filter(ph => ph.userId === fullUser.id);
            setPointsHistory(userPointsHistory);
        }
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      localStorage.clear();
      setProducts(MOCK_PRODUCTS);
      setMockUsers(INITIAL_MOCK_USERS);
      setCart([]);
      setUser(null);
    } finally {
        setIsAppLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isAppLoaded) return;
    try {
      localStorage.setItem('aroma-cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart, isAppLoaded]);

  useEffect(() => {
    if (!isAppLoaded) return;
    try {
      if (user) {
        localStorage.setItem('aroma-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('aroma-user');
      }
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  }, [user, isAppLoaded]);

   useEffect(() => {
    if (!isAppLoaded) return;
    try {
      localStorage.setItem('aroma-products', JSON.stringify(products));
    } catch (error) {
      console.error("Failed to save products to localStorage", error);
    }
  }, [products, isAppLoaded]);

  useEffect(() => {
    if (!isAppLoaded) return;
    try {
        localStorage.setItem('aroma-users', JSON.stringify(MOCK_USERS));
        // Also update user state in case their own data changed (e.g. password)
        if (user) {
            const updatedUserFromMock = MOCK_USERS.find(u => u.id === user.id);
            if (updatedUserFromMock && updatedUserFromMock.password !== user.password) {
                setUser(updatedUserFromMock);
            }
        }
    } catch (error) {
        console.error("Failed to save users to localStorage", error);
    }
  }, [MOCK_USERS, isAppLoaded]);


  const login = (identifier: string, password?: string) => {
    const foundUser = MOCK_USERS.find(u => u.email === identifier || u.name === identifier);
    
    if (foundUser && foundUser.password === password) {
      const fullUser = { ...foundUser, password: password };
      setUser(fullUser);

      toast({ title: `¡Bienvenido de vuelta, ${foundUser.name}!` });
      const userOrders = MOCK_ORDERS.filter(o => o.userId === fullUser.id);
      setOrders(userOrders);
      const userPointsHistory = MOCK_POINTS_HISTORY.filter(ph => ph.userId === fullUser.id);
      setPointsHistory(userPointsHistory);

    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Nombre/Correo o Contraseña Incorrectas' });
      throw new Error("Nombre/Correo o Contraseña Incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    setPointsHistory([]);
    localStorage.removeItem('aroma-user');
    // We keep the cart so it's not lost on logout
    toast({ title: 'Has cerrado sesión.' });
  };
  
  const register = (name: string, email: string, profilePicture?: string, password?: string) => {
    if (MOCK_USERS.some(u => u.email === email)) {
      toast({ variant: 'destructive', title: 'Error', description: 'Este correo ya está registrado.' });
      throw new Error("Email already exists");
    }
     if (MOCK_USERS.some(u => u.name === name)) {
      toast({ variant: 'destructive', title: 'Error', description: 'Este nombre de usuario ya está en uso.' });
      throw new Error("Username already exists");
    }
    const newUser: User = { 
        id: `user_${Date.now()}`, 
        name, 
        email, 
        profilePicture,
        points: 50, 
        password: password
    };
    setMockUsers(prev => [...prev, newUser]);
    
    const welcomePoints: PointsHistoryEntry = { 
      id: `ph_welcome_${Date.now()}`, 
      userId: newUser.id,
      date: new Date().toISOString(), 
      description: 'Bono de Bienvenida', 
      amount: 50 
    };
    MOCK_POINTS_HISTORY.push(welcomePoints);
    
    setUser(newUser);
    setPointsHistory([welcomePoints]);
    
    toast({ title: `¡Bienvenido a Aroma, ${name}!` });
  };

  const updateUser = (payload: UpdateUserPayload) => {
    if(!user) return;
    const updatedUser = {...user, ...payload};
    setUser(updatedUser);
    setMockUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    toast({ title: 'Perfil actualizado', description: 'Tus datos han sido actualizados con éxito.'})
  }

  const updatePassword = (currentPassword: string, newPassword: string) => {
    if (!user) return;

    if (user.password !== currentPassword) {
      throw new Error("La contraseña actual es incorrecta.");
    }
    
    const updatedUser = { ...user, password: newPassword };
    setUser(updatedUser);
    setMockUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  }

  const deleteAccount = (password: string) => {
    if (!user) {
      throw new Error("No hay un usuario autenticado para eliminar.");
    }
  
    const mockUser = MOCK_USERS.find(u => u.id === user.id);
    
    if (mockUser && mockUser.password !== password) {
      toast({
        variant: "destructive",
        title: "Contraseña Incorrecta",
        description: "La contraseña que ingresaste no es correcta. No se ha eliminado la cuenta."
      });
      throw new Error("Incorrect password");
    }
  
    setMockUsers(prev => prev.filter(u => u.id !== user.id));
    
    toast({
      title: "Cuenta Eliminada",
      description: "Tu cuenta ha sido eliminada permanentemente."
    });
    logout();
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    toast({
      title: '¡Añadido a la bandeja!',
      description: `${product.name} fue añadido a tu bandeja.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  }
  
  const createOrder = () => {
    if (!user || cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalPointsAwarded = cart.reduce((sum, item) => sum + (item.product.points || 0) * item.quantity, 0);

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
      items: cart.map(cartItem => ({
        productId: cartItem.product.id,
        productName: cartItem.product.name,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
        pointsAwarded: (cartItem.product.points || 0) * cartItem.quantity,
      })),
      total,
      totalPointsAwarded,
    };
    
    MOCK_ORDERS.push(newOrder);
    setOrders(prevOrders => [newOrder, ...prevOrders]);

    const pointsEntry: PointsHistoryEntry = {
      id: `ph_order_${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
      description: `Compra - Pedido #${newOrder.id.slice(-5)}`,
      amount: totalPointsAwarded
    };

    MOCK_POINTS_HISTORY.push(pointsEntry);
    setPointsHistory(prev => [pointsEntry, ...prev]);

    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, points: prevUser.points + totalPointsAwarded };
      setMockUsers(prevMocks => prevMocks.map(u => u.id === updatedUser.id ? updatedUser : u));
      return updatedUser;
    });

    clearCart();

    toast({
      title: "¡Compra finalizada con éxito!",
      description: `Gracias por tu pedido. Has ganado ${totalPointsAwarded} puntos.`,
    });
  }

  const isPreviouslyOrdered = (productId: string): boolean => {
    if (!user) return false;
    return orders.some(order => order.items.some(item => item.productId === productId));
  }

  const redeemPoints = (productId: string, points: number) => {
    const product = products.find(p => p.id === productId);
    if (!user || !product) return;

    setUser(prevUser => {
        if (!prevUser) return null;
        const updatedUser = { ...prevUser, points: prevUser.points - points };
        setMockUsers(prevMocks => prevMocks.map(u => u.id === updatedUser.id ? updatedUser : u));
        return updatedUser;
    });

    const pointsEntry: PointsHistoryEntry = {
      id: `ph_${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
      description: `Canje - ${product.name}`,
      amount: -points
    };

    MOCK_POINTS_HISTORY.push(pointsEntry);
    setPointsHistory(prevHistory => [pointsEntry, ...prevHistory]);
  };
  
  const requestPasswordReset = (email: string) => {
    const userExists = MOCK_USERS.some(u => u.email === email);
    if (userExists) {
        // In a real app, you would generate a token, save it with an expiry, 
        // and send an email with a link like `/reset-password?token=...`
        toast({
            title: "Correo de recuperación enviado",
            description: "Si tu correo está en nuestra base de datos, recibirás un enlace para restablecer tu contraseña. (Simulación)"
        });
    } else {
        // We show the same message to prevent email enumeration
         toast({
            title: "Correo de recuperación enviado",
            description: "Si tu correo está en nuestra base de datos, recibirás un enlace para restablecer tu contraseña. (Simulación)"
        });
    }
  };

  const updateProduct = (productId: string, payload: UpdateProductPayload) => {
    setProducts(prevProducts => {
      const newProducts = prevProducts.map(p => {
        if (p.id === productId) {
          return { ...p, ...payload };
        }
        return p;
      });
      return newProducts;
    });
  };

  const value: AppContextType = {
    products,
    user,
    orders,
    pointsHistory,
    cart,
    isAppLoaded,
    login,
    logout,
    register,
    updateUser,
    deleteAccount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    createOrder,
    isPreviouslyOrdered,
    redeemPoints,
    updatePassword,
    requestPasswordReset,
    updateProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

    