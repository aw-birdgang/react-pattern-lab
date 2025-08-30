export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalComments: number;
}

export interface RecentActivity {
  id: string;
  type: 'user_joined' | 'post_created' | 'comment_added';
  message: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export interface DashboardState {
  stats: DashboardStats | null;
  recentActivities: RecentActivity[];
  loading: boolean;
  error: string | null;
}
