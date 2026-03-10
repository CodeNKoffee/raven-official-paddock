import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gauge, Truck, ChevronDown, ChevronUp, CheckCircle2, XCircle, Clock, FileCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Calculate time relative to March 9th, 2026
const getCountdown = () => {
  const target = new Date('2026-03-09T00:00:00');
  const now = new Date();
  const diff = Math.abs(target.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const isPast = now.getTime() > target.getTime();

  return { days, hours, minutes, seconds, isPast };
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'rejected':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    default:
      return <FileCheck className="w-4 h-4 text-blue-500" />;
  }
};

export const EngineeringScoreboard = () => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(getCountdown());
  const [showTimeline, setShowTimeline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timelineEvents = [
    { date: 'Oct 20, 2025', status: 'info', type: 'competition' },
    { date: 'Oct 21, 2025', status: 'approved', type: 'competition' },
    { date: 'Nov 10, 2025', status: 'pending', type: 'competition' },
    { date: 'Nov 19, 2025', status: 'approved', type: 'competition' },
    { date: 'Nov 27, 2025', status: 'approved', type: 'competition' },
    { date: 'Nov 27, 2025', status: 'rejected', type: 'customs' },
    { date: 'Nov 27, 2025', status: 'pending', type: 'customs' },
    { date: 'Nov 30, 2025', status: 'pending', type: 'customs' },
    { date: 'Dec 2, 2025', status: 'info', type: 'customs' },
    { date: 'Dec 8, 2025', status: 'info', type: 'competition' },
    { date: 'Dec 11, 2025', status: 'pending', type: 'customs' },
    { date: 'Dec 12, 2025', status: 'rejected', type: 'customs' },
    { date: 'Dec 12, 2025', status: 'pending', type: 'customs' },
    { date: 'Dec 16, 2025', status: 'info', type: 'competition' },
    { date: 'Dec 17, 2025', status: 'pending', type: 'customs' },
    { date: 'Dec 23, 2025', status: 'rejected', type: 'customs' },
    { date: 'Dec 25, 2025', status: 'info', type: 'customs' },
    { date: 'Dec 29, 2025', status: 'rejected', type: 'customs' },
    { date: 'Jan 1, 2026', status: 'info', type: 'customs' },
    { date: 'Jan 22, 2026', status: 'pending', type: 'customs' },
    { date: 'Jan 24, 2026', status: 'approved', type: 'customs' },
    { date: 'Jan 26, 2026', status: 'approved', type: 'customs' },
    { date: 'Jan 28, 2026', status: 'pending', type: 'customs' },
    { date: 'Feb 2, 2026', status: 'pending', type: 'nsd' },
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-black to-[hsl(0,0%,3%)] overflow-hidden">
      {/* Racing stripe accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            {t('engineeringScoreboard.missionControl')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white racing-headline">
            {t('engineeringScoreboard.title')}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {/* Countdown */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {countdown.isPast
                  ? t('engineeringScoreboard.countdown.daysSince')
                  : t('engineeringScoreboard.countdown.daysTo')}
              </span>
            </div>
            <div className="flex items-baseline gap-1 rtl:flex-row-reverse">
              <span className="text-5xl font-bold text-white racing-headline">
                {countdown.days}
              </span>
              <span className="text-xl text-muted-foreground">{t('engineeringScoreboard.time.days')}</span>
            </div>
            <div className="flex gap-4 mt-3 text-sm text-muted-foreground rtl:flex-row-reverse">
              <span>{countdown.hours}{t('engineeringScoreboard.time.hours')}</span>
              <span>{countdown.minutes}{t('engineeringScoreboard.time.minutes')}</span>
              <span>{countdown.seconds}{t('engineeringScoreboard.time.seconds')}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {t('engineeringScoreboard.countdown.qualificationRound')}
            </p>
          </div>

          {/* Development Phase */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('engineeringScoreboard.devPhase.label')}
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-2">
              {t('engineeringScoreboard.devPhase.simulation')}
            </p>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '65%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t('engineeringScoreboard.devPhase.preparing')}
            </p>
          </div>

          {/* Car Status */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('engineeringScoreboard.carStatus.label')}
              </span>
            </div>
            <p className="text-xl font-bold text-white mb-1">
              {t('engineeringScoreboard.carStatus.customsCleared')}
            </p>
            <p className="text-sm text-green-500 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              {t('engineeringScoreboard.carStatus.ntraApproved')}
            </p>
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="flex items-center gap-2 text-sm font-semibold bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full justify-center"
            >
              {t('engineeringScoreboard.viewTimeline')}
              {showTimeline ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>        </motion.div>

        {/* Expandable Timeline */}
        <motion.div
          initial={false}
          animate={{
            height: showTimeline ? 'auto' : 0,
            opacity: showTimeline ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 rounded-2xl bg-[hsl(0,0%,5%)] border border-white/5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-semibold text-white">
                  {t('engineeringScoreboard.timeline.title')}
                </h4>
                <span className="text-[10px] px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold">
                  🌍 {t('engineeringScoreboard.timeline.onlyAfrican')}
                </span>
              </div>
              <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {timelineEvents.length} {t('engineeringScoreboard.timeline.events')}
              </span>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 rounded-xl bg-black/30 border border-white/5">
              <div className="text-center p-2">
                <p className="text-2xl font-bold text-primary">78</p>
                <p className="text-[10px] text-muted-foreground uppercase">{t('engineeringScoreboard.timeline.stats.teamsSelected')}</p>
              </div>
              <div className="text-center p-2">
                <p className="text-2xl font-bold text-red-500">4</p>
                <p className="text-[10px] text-muted-foreground uppercase">{t('engineeringScoreboard.timeline.stats.rejections')}</p>
              </div>
              <div className="text-center p-2">
                {/* Time from November 27th, 2025 to now */}
                <p className="text-2xl font-bold text-yellow-500">{Math.floor((Date.now() - new Date('2025-11-27').getTime()) / (1000 * 60 * 60 * 24))}</p>
                <p className="text-[10px] text-muted-foreground uppercase">{t('engineeringScoreboard.timeline.stats.daysFought')}</p>
              </div>
              <div className="text-center p-2">
                <p className="text-2xl font-bold text-green-500">1</p>
                <p className="text-[10px] text-muted-foreground uppercase">{t('engineeringScoreboard.timeline.stats.victory')}</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mb-4 text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-muted-foreground">{t('engineeringScoreboard.timeline.legend.competition')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-muted-foreground">{t('engineeringScoreboard.timeline.legend.customs')}</span>
              </span>
            </div>

            {/* Scrollable timeline */}
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                {timelineEvents.map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 p-3 rounded-lg transition-colors ${item.status === 'approved' ? 'bg-green-500/10 border border-green-500/20' :
                      item.status === 'rejected' ? 'bg-red-500/5 border border-red-500/10' :
                        'hover:bg-white/5'
                      }`}
                  >
                    <div className="flex flex-col items-center shrink-0">
                      {getStatusIcon(item.status)}
                      {index < timelineEvents.length - 1 && (
                        <div className={`w-px flex-1 mt-2 ${item.status === 'approved' ? 'bg-green-500/30' :
                          item.status === 'rejected' ? 'bg-red-500/30' :
                            'bg-white/10'
                          }`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-muted-foreground">
                          {item.date}
                        </p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${item.type === 'competition'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                          {item.type === 'competition' ? 'BFMC' : item.type === 'nsd' ? 'DHL/NSD' : 'DHL/NTRA'}
                        </span>
                        {item.status === 'approved' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                            Success
                          </span>
                        )}
                        {item.status === 'rejected' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-500">
                            Setback
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-white mt-1">
                        {t(`engineeringScoreboard.events.${index}.event`)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t(`engineeringScoreboard.events.${index}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
              <p className="text-sm text-white text-center font-medium">
                {t('engineeringScoreboard.timeline.footer')} 🏎️
              </p>
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
                {t('engineeringScoreboard.timeline.footerDesc')}
              </p>
              <p className="text-[10px] text-primary/80 text-center font-medium">
                {t('engineeringScoreboard.timeline.footerBadge')} 🌍
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringScoreboard;
