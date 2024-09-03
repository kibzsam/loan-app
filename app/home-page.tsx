import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import LoanCard from "@/components/LoanCard";
import { useQuery } from "@apollo/client";
import { LOANS_PRODUCTS } from "@/services/loanService";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { loading, error, data } = useQuery(LOANS_PRODUCTS);
  const loanProductsData = data?.loanProducts;
  return (
    <View className="h-screen w-screen px-6 pt-24 relative">
      <View className="flex flex-col">
        <Text className="text-3xl font-roboto text-black font-extrabold w-[16.375rem] mb-6">
          Loan Application Dashboard
        </Text>
        <ScrollView>
          {loading ? <ActivityIndicator size="large" color="#30C2E3" /> : null}
          {error ? <Text>Error! {error.message}</Text> : null}
          {loanProductsData && loanProductsData.length > 0
            ? loanProductsData.map((loan: any, index: number) => {
                return (
                  <LoanCard
                    key={index}
                    loan_name={loan?.name}
                    maximum_amount={loan?.maximumAmount}
                    interest={loan?.interestRate}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
      <View className="absolute bottom-4 left-0 right-0 px-6">
        <Link href="/loan" asChild>
          <Pressable className="flex flex-row items-center justify-center rounded-3xl bg-[#30C2E3] h-[3.5rem]">
            <Text className="font-roboto text-base font-bold text-white">
              APPLY FOR A LOAN
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
