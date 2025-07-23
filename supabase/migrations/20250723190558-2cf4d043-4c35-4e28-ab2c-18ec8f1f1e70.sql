-- Add indexes for better query performance (skipping trigger creation)
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_quotes_user_id ON public.enterprise_quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_quotes_status ON public.enterprise_quotes(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers(subscription_status);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON public.usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_service ON public.usage_tracking(service_type);
CREATE INDEX IF NOT EXISTS idx_user_add_ons_user_id ON public.user_add_ons(user_id);