import BlurImage from "../components/BlurImage";
import { createClient } from '@supabase/supabase-js'

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const { data, error } = await supabaseAdmin
    .from('images')
    .select('*')
    .order('id');

  return {
    props: {
      images: data
    },
  }
}

export type CustomImage = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string
}

export default function Gallery({ images }: { images: CustomImage[] }) {
  return (
    <div className="mx-w-2xl mx-auto py-16 px-4 sm:py-24 smpx-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-4xl text-center font-black mb-12">Next-Supabase Image Gallery</h1>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}