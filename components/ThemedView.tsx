import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};
//i overwrote the lightcolor by doing lightcolor = '#DFF2F3' so that it isnt white
export function ThemedView({ style, lightColor='#DFF2F3', darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
