import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

export const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if Ctrl/Cmd + Shift is pressed
      if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
        switch (event.key.toLowerCase()) {
          case 'h':
            event.preventDefault();
            navigate('/');
            toast({
              title: 'Navigation',
              description: 'Navigated to Dashboard',
              duration: 2000,
            });
            break;
          case 'a':
            event.preventDefault();
            navigate('/ai');
            toast({
              title: 'Navigation',
              description: 'Navigated to AI Workspace',
              duration: 2000,
            });
            break;
          case 'i':
            event.preventDefault();
            navigate('/ip');
            toast({
              title: 'Navigation',
              description: 'Navigated to IP Fortress',
              duration: 2000,
            });
            break;
          case 'f':
            event.preventDefault();
            navigate('/forge');
            toast({
              title: 'Navigation',
              description: 'Navigated to Capital Forge',
              duration: 2000,
            });
            break;
          case 'm':
            event.preventDefault();
            navigate('/add-ons');
            toast({
              title: 'Navigation',
              description: 'Navigated to Marketplace',
              duration: 2000,
            });
            break;
          case 'p':
            event.preventDefault();
            navigate('/pricing');
            toast({
              title: 'Navigation',
              description: 'Navigated to Pricing',
              duration: 2000,
            });
            break;
          case 's':
            event.preventDefault();
            navigate('/settings');
            toast({
              title: 'Navigation',
              description: 'Navigated to Settings',
              duration: 2000,
            });
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate, toast]);

  return {
    shortcuts: {
      'Ctrl+Shift+H': 'Dashboard',
      'Ctrl+Shift+A': 'AI Workspace', 
      'Ctrl+Shift+I': 'IP Fortress',
      'Ctrl+Shift+F': 'Capital Forge',
      'Ctrl+Shift+M': 'Marketplace',
      'Ctrl+Shift+P': 'Pricing',
      'Ctrl+Shift+S': 'Settings'
    }
  };
};
