import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from('about_me')
        .select('*')
        .single();
      if (!error) setAbout(data);
      setLoading(false);
    };
    fetchAbout();
  }, []);

  if (loading) {
    return <Loader2 className="h-8 w-8 animate-spin text-primary" />;
  }

  if (!about) {
    return <div>Failed to load about me info.</div>;
  }

  return (
    <div>
      <h1>{about.full_name}</h1>
      <p>{about.headline}</p>
      <p>{about.bio}</p>
      {/* Add more fields as needed */}
    </div>
  );
}