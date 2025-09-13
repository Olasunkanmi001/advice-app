import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";

type Advice = {
  id: number;
  advice: string;
};

export default function Index() {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`);
      const json = await res.json();
      setAdvice(json.slip);
    } catch (err) {
      console.error(err);
      setError("Could not load advice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-slate-900 items-center justify-center p-6`}>
      <StatusBar barStyle="light-content" />
      <View style={tw`w-full max-w-md bg-slate-800 rounded-2xl p-6 shadow-lg`}>
        <Text style={tw`text-slate-400 text-xs uppercase tracking-widest mb-2 text-center`}>
          Advice Generator
        </Text>

        <View style={tw`min-h-[120px] items-center justify-center`}>
          {loading ? (
            <ActivityIndicator size="large" color="#10B981" />
          ) : error ? (
            <Text style={tw`text-red-400 text-center`}>{error}</Text>
          ) : advice ? (
            <>
              <Text style={tw`text-slate-100 text-center text-lg mb-4`}>
                “{advice.advice}”
              </Text>
              <Text style={tw`text-slate-400 text-center text-sm`}>#{advice.id}</Text>
            </>
          ) : (
            <Text style={tw`text-slate-400 text-center`}>No advice yet</Text>
          )}
        </View>

        <Pressable style={tw`bg-emerald-500 px-6 py-3 rounded-full mt-6`} onPress={fetchAdvice}>
          {({ pressed }) => (
            <Text style={tw`text-white font-semibold`}>
              {pressed ? "Loading..." : "Give me advice"}
            </Text>
          )}
        </Pressable>
      </View>

      <Text style={tw`text-slate-500 text-xs mt-6`}>
        Built with Expo • twrnc • Advice Slip API
      </Text>
    </SafeAreaView>
  );
}