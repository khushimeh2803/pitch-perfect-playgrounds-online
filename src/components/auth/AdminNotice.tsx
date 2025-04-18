
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const AdminNotice = () => {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <InfoIcon className="h-4 w-4 text-blue-500" />
      <AlertDescription className="text-blue-700">
        <strong>Default Admin Account:</strong> Use email <span className="font-mono">admin@pitchperfect.com</span> with password <span className="font-mono">admin123</span> to create an admin account.
      </AlertDescription>
    </Alert>
  );
};

export default AdminNotice;
