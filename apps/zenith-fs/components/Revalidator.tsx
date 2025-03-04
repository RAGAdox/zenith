"use client";

import { revalidatePathAction } from "@/actions/revalidateAction";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";

const Revalidator = () => {
  const channel = useRef<RealtimeChannel>(null);
  const handleSubscription = async () => {
    const supabase = createClient();

    channel.current = supabase
      .channel("cart")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart" },
        () => {
          revalidatePathAction("/menu");
        }
      )
      .subscribe();
  };
  useEffect(() => {
    handleSubscription();
    return () => {
      channel.current?.unsubscribe();
    };
  }, []);
  return <></>;
};

export default Revalidator;
