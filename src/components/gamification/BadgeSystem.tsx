import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, Star, Target, Trophy, Zap, Crown, Shield, Rocket,
  CheckCircle, Lock, Gift, TrendingUp
} from 'lucide-react';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'achievement' | 'milestone' | 'special' | 'community';
  points: number;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const mockBadges: BadgeData[] = [
  {
    id: 'first-login',
    name: 'Welcome Aboard',
    description: 'Successfully logged in for the first time',
    icon: Star,
    category: 'milestone',
    points: 10,
    earned: true,
    earnedDate: '2024-03-15',
    progress: 100,
    requirement: 'Complete first login',
    rarity: 'common'
  },
  {
    id: 'subscription-starter',
    name: 'Subscription Hero',
    description: 'Subscribed to your first paid plan',
    icon: Crown,
    category: 'achievement',
    points: 50,
    earned: true,
    earnedDate: '2024-03-16',
    progress: 100,
    requirement: 'Subscribe to any paid plan',
    rarity: 'rare'
  },
  {
    id: 'power-user',
    name: 'Power User',
    description: 'Used all major platform features',
    icon: Zap,
    category: 'achievement',
    points: 100,
    earned: false,
    progress: 75,
    requirement: 'Use AI Workspace, IP Fortress, and Business Lab',
    rarity: 'epic'
  },
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Joined during the beta period',
    icon: Rocket,
    category: 'special',
    points: 200,
    earned: true,
    earnedDate: '2024-01-10',
    progress: 100,
    requirement: 'Sign up during beta',
    rarity: 'legendary'
  },
  {
    id: 'community-contributor',
    name: 'Community Helper',
    description: 'Helped other users in the community',
    icon: Shield,
    category: 'community',
    points: 75,
    earned: false,
    progress: 40,
    requirement: 'Receive 10+ helpful votes on answers',
    rarity: 'rare'
  },
  {
    id: 'analytics-master',
    name: 'Analytics Master',
    description: 'Created 50+ custom analytics reports',
    icon: TrendingUp,
    category: 'achievement',
    points: 150,
    earned: false,
    progress: 20,
    requirement: 'Create 50 custom reports',
    rarity: 'epic'
  }
];

interface UserProgress {
  totalPoints: number;
  level: number;
  nextLevelPoints: number;
  currentLevelPoints: number;
  badgesEarned: number;
  totalBadges: number;
}

export const BadgeSystem: React.FC = () => {
  const [badges, setBadges] = useState<BadgeData[]>(mockBadges);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 260,
    level: 3,
    nextLevelPoints: 300,
    currentLevelPoints: 200,
    badgesEarned: 3,
    totalBadges: 6
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-500 border-gray-200';
      case 'rare': return 'text-blue-500 border-blue-200';
      case 'epic': return 'text-purple-500 border-purple-200';
      case 'legendary': return 'text-yellow-500 border-yellow-200';
      default: return 'text-gray-500 border-gray-200';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-50';
      case 'rare': return 'bg-blue-50';
      case 'epic': return 'bg-purple-50';
      case 'legendary': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };

  const filteredBadges = badges.filter(badge => 
    selectedCategory === 'all' || badge.category === selectedCategory
  );

  const claimBadge = (badgeId: string) => {
    setBadges(prev => prev.map(badge => 
      badge.id === badgeId && badge.progress === 100 && !badge.earned
        ? { ...badge, earned: true, earnedDate: new Date().toISOString() }
        : badge
    ));
  };

  return (
    <div className="space-y-6">
      {/* User Progress Overview */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Level {userProgress.level}</h2>
            <p className="text-muted-foreground">
              {userProgress.totalPoints} total points earned
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-semibold">
                {userProgress.badgesEarned}/{userProgress.totalBadges} Badges
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {userProgress.nextLevelPoints - userProgress.totalPoints} points to Level {userProgress.level + 1}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Next Level</span>
            <span>
              {userProgress.totalPoints - userProgress.currentLevelPoints}/
              {userProgress.nextLevelPoints - userProgress.currentLevelPoints}
            </span>
          </div>
          <Progress 
            value={((userProgress.totalPoints - userProgress.currentLevelPoints) / 
                   (userProgress.nextLevelPoints - userProgress.currentLevelPoints)) * 100} 
            className="h-3"
          />
        </div>
      </GlassCard>

      {/* Badge Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Badges</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
          <TabsTrigger value="milestone">Milestones</TabsTrigger>
          <TabsTrigger value="special">Special</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => (
              <GlassCard 
                key={badge.id} 
                className={`p-6 transition-all duration-300 hover:shadow-lg ${
                  badge.earned ? 'ring-2 ring-primary/20' : 'opacity-80'
                } ${getRarityBg(badge.rarity)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full ${
                    badge.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                      {badge.rarity}
                    </Badge>
                    {badge.earned && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    {!badge.earned && badge.progress !== 100 && (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{badge.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{badge.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{badge.requirement}</span>
                    <span className="font-semibold flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      {badge.points} pts
                    </span>
                  </div>

                  {!badge.earned && badge.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                  )}

                  {badge.earned && badge.earnedDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {badge.progress === 100 && !badge.earned && (
                  <Button 
                    onClick={() => claimBadge(badge.id)}
                    className="w-full"
                    size="sm"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Claim Badge
                  </Button>
                )}

                {badge.earned && (
                  <div className="text-center py-2">
                    <Badge variant="default" className="bg-success text-success-foreground">
                      Earned
                    </Badge>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>

          {filteredBadges.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No badges found in this category</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};