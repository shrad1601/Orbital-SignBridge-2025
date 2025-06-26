import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';





export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true, 
        headerStatusBarHeight: 90,
        headerStyle: {
          backgroundColor: '#6F8FAF',
        },
        headerLeft: () => (
            <Image
                source= {require('@/assets/images/logo-new.png')}
                style={{ width: 90, height: 90, marginLeft: 221, 
                       position: 'absolute', bottom: -13}}
                resizeMode="contain"
            />
        ),
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        
        //commenting out coz i moved it up so that every page has the logo
        /*  headerLeft: () => (
            <Image
                source= {require('@/assets/images/logo-new.png')}
                style={{ width: 90, height: 90, marginLeft: 205, 
                       position: 'absolute', bottom: -13}}
                resizeMode="contain"
            />
        ),*/ 
          
          tabBarIcon: ({ color}) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="explore" //refers to the explore.tsx file
        options={{
          title: "Let's learn",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="avatar" //refers to the avatar.tsx file
        options={{
          title: "Avatar",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.stand" color={color} />,
        }}
      />
      <Tabs.Screen
        name="achievement" //refers to the achievement.tsx file
        options={{
          title: "Badges",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="medal" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings" //refers to the achievement.tsx file
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />



    </Tabs>
  );
}
