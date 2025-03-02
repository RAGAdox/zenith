import { createClient } from "@/utils/supabase/server";

const getCurrentUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
};

export { getCurrentUser };
