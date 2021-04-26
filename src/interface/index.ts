import { ReactNode } from 'react';

export interface Enviroment {
   key: string;
   title: string;
}

export interface Frequencies {
   key: string;
   title: string;
}

export interface Plants {
   id: number;
   name: string;
   about: string;
   water_tips: string;
   photo: string;
   environments: string[];
   frequency: {
      times: number;
      repeat_every: string;
   }
   dateTimeNotification: Date;
}

export interface MyPlant extends Plants {
   hour: string;
}

export interface UserContextProps {
   children: ReactNode;
}

export interface UserContextData {
   userName: string;
   loading: boolean;
   changeUserName: (name: string) => Promise<void>;
   savePlant: (plant: Plants) => Promise<void>;
   getPlants: () => Promise<MyPlant[]>;
   removePlant: (id: number) => Promise<void>;
   logOut: () => Promise<void>;
}

export interface StoragePlantProps {
   [id: string]: {
      data: Plants,
      notificationId: string;
   }
}

export interface ConfirmationProps {
   title: string;
   buttonTitle: string;
   subtitle: string;
   icon: 'smile' | 'hug',
   nextScreen: string;
}