import { getBanners, getNews } from '@/lib/sanity/queries';
import { createClient } from '@/lib/supabase/server';
import HeroBanner from './hero';
import Navbar from './navbar';
import LeaderboardTable from './leaderboard';

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  // Fetching data in parallel for speed
  const [banners, newsData] = await Promise.all([
    getBanners(),
    getNews()
  ]);

  const supabase = await createClient();
  const { data: topPlayers } = await supabase
    .from('profiles')
    .select('username, xp')
    .order('xp', { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section with Sanity Banners */}
      <section className="relative">
        {banners.length > 0 && <HeroBanner banner={banners[0]} />}
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* News Section (Left/Center Column) */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white border-l-4 border-blue-600 pl-4">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsData.map((item: any) => (
              <article key={item._id} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all shadow-lg">
                <div className="h-48 bg-slate-800 relative">
                   {/* If news has images, use urlFor(item.image).url() here */}
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{item.category || 'News'}</span>
                  <h3 className="text-xl font-bold mt-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 mt-3 text-sm line-clamp-3">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Leaderboard Sidebar (Right Column) */}
        <aside className="space-y-8">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white border-l-4 border-blue-600 pl-4">
            Top Players
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
            <LeaderboardTable players={topPlayers || []} />
            <button className="w-full mt-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 rounded-lg transition-all">
              View Full Rankings
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}