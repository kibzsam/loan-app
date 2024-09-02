import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
type LoadCardProps = {
  loan_name: string;
  maximum_amount: number;
  interest: number;
};
export const LoanCard = ({
  loan_name,
  maximum_amount,
  interest,
}: LoadCardProps) => {
  return (
    <View className="relative mb-3">
      <View className="absolute bottom-4 right-3">
        <View className="rounded-xl flex flex-row border border-[#30C2E3] items-center justify-center h-[2.1rem] px-3">
          <Text className="font-roboto text-xs font-medium text-[#30C2E3] mr-1">
            Learn More
          </Text>
          <Ionicons name="arrow-forward" color="#30C2E3" />
        </View>
      </View>
      <View className="rounded-xl pt-5 pb-4 px-4 border border-black">
        <View className="flex flex-row mb-5">
          <Text className="font-roboto text-xl font-bold text-black">
            {loan_name}
          </Text>
        </View>
        <View className="flex flex-row justify-start">
          <View className="flex flex-col">
            <Text className="font-roboto text-xs font-medium text-black">
              Maximum Amount:
            </Text>
            <Text className="font-roboto text-2xl font-bold text-[#30C2E3]">
              {`$${maximum_amount.toLocaleString()}`}
            </Text>
            <Text className="font-roboto text-xs font-medium text-black">
              {`Interest:${interest}%`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default LoanCard;
