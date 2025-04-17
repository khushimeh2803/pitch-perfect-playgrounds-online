
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AIGroundRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, session } = useAuth();

  const fetchRecommendations = async () => {
    if (!user || !session) {
      toast.error('Please log in to get recommendations');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recommend-grounds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      toast.error('Failed to fetch recommendations');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>AI Ground Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={fetchRecommendations} 
          disabled={isLoading}
          className="w-full mb-4"
        >
          {isLoading ? 'Generating...' : 'Get AI Recommendations'}
        </Button>
        {recommendations && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p>{recommendations}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIGroundRecommendations;
