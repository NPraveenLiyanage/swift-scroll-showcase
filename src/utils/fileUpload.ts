
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(
  file: File, 
  bucket: string = 'portfolio', 
  folder: string = ''
): Promise<string | null> {
  try {
    if (!file) return null;
    
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExt}`;
    
    // Upload file to Supabase Storage
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}
