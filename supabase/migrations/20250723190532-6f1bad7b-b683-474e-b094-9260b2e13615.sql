-- Create the missing trigger for auto-creating user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_quotes_user_id ON public.enterprise_quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_quotes_status ON public.enterprise_quotes(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers(subscription_status);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON public.usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_service ON public.usage_tracking(service_type);
CREATE INDEX IF NOT EXISTS idx_user_add_ons_user_id ON public.user_add_ons(user_id);

-- Add constraints for data integrity
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;