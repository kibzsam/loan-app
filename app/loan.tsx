import {
  View,
  Text,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Form, Controller } from "react-hook-form";
import { Input } from "@/components/Input";
import { useQuery } from "@apollo/client";
import { applyLoan } from "@/services/loanService";
import { useState } from "react";
import { isLoaded } from "expo-font";

interface IFormInput {
  fullName: String;
  email: String;
  loanAmount: Number;
  loanPurpose: String;
}
export default function ApplyLoan() {
  const [loading, setLoading] = useState(false);
  const schema: any = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().required("Email is required"),
    loanAmount: yup.number().positive().required("Loan amount is required"),
    loanPurpose: yup.string().required("Loan purpose is required"),
  });
  function showToast({ message }: { message: string }) {
    ToastAndroid.show(`${message}`, ToastAndroid.SHORT);
  }
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      loanAmount: "",
      loanPurpose: "",
    },
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    applyLoan({
      data: {
        full_name: data?.fullName,
        email: data?.email,
        loan_amount: parseInt(data?.loanAmount),
        loan_purpose: data?.loanPurpose,
      },
    })
      .then((response) => {
        const message = response.data;
        setLoading(false);
        showToast({ message: message["message"] });
      })
      .catch((e) => {
        setLoading(false);
        showToast({ message: e?.message });
      });
  };
  return (
    <View className="h-screen w-screen px-6 pt-24 relative">
      <View className="flex flex-col">
        <Text className="text-3xl font-roboto text-black font-extrabold w-[16.375rem] mb-10">
          Apply for a loan
        </Text>
        <ScrollView>
          <View>
            <Text className="font-roboto font-medium text-base text-black mb-2">
              Full Name
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    placeholder="First name"
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
              name="fullName"
            />
            {errors.fullName && (
              <Text className="font-roboto font-medium text-sm text-red-500">
                {errors.fullName.message}
              </Text>
            )}
            <Text className="font-roboto font-medium text-base text-black mb-2 mt-4">
              Email
            </Text>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="yourname@example.com"
                  onChange={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="font-roboto font-medium text-sm text-red-500">
                {errors.email.message}
              </Text>
            )}
            <Text className="font-roboto font-medium text-base text-black mb-2 mt-4">
              Loan Amount
            </Text>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="UGX" onChange={onChange} value={value} />
              )}
              name="loanAmount"
            />
            {errors.loanAmount && (
              <Text className="font-roboto font-medium text-sm text-red-500">
                {errors.loanAmount.message}
              </Text>
            )}
            <Text className="font-roboto font-medium text-base text-black mb-2 mt-4">
              Loan Purpose
            </Text>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="" onChange={onChange} value={value} />
              )}
              name="loanPurpose"
            />
            {errors.loanPurpose && (
              <Text className="font-roboto font-medium text-sm text-red-500">
                {errors.loanPurpose.message}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      <View className="absolute bottom-4 left-0 right-0 px-6">
        <Pressable
          className="flex flex-row items-center justify-center rounded-3xl bg-[#30C2E3] h-[3.5rem]"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-roboto text-base font-bold text-white mr-4">
            SUBMIT
          </Text>
          {loading ? <ActivityIndicator color="#ffffff" /> : null}
        </Pressable>
      </View>
    </View>
  );
}
