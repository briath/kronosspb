
// Fix: Import React to resolve 'Cannot find namespace React' error when using React.ReactNode
import React from 'react';

export enum ServiceType {
  SCS = 'SCS',
  Security = 'Security',
  AudioVideo = 'AudioVideo',
  SmartHome = 'SmartHome',
  Electrical = 'Electrical',
  FireAlarm = 'FireAlarm'
}

export interface Service {
  id: string;
  type: ServiceType;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  scope: string[];
  benefits: string[];
  brands: string[];
  icon: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  type: ServiceType;
  objectType: 'Apartment' | 'House' | 'Office' | 'Commercial';
  description: string;
  image: string;
  tags: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}