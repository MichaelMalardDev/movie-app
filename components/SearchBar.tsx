import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void; // Probably gonna have to change the "?" to keep the same search bar from the index to search bar for fluid search
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor={"#ab8bff"}
      />

      <TextInput
        onPress={onPress}
        // autoFocus={true}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#A8b5db"}
        className='flex-1 ml-2 text-white'
      />
    </View>
  );
};

export default SearchBar;
