import { useState, useEffect, useCallback } from 'react';
import { DashboardState, DashboardStats, RecentActivity } from '../types';

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>({
    stats: null,
    recentActivities: [],
    loading: true,
    error: null,
  });

  const fetchStats = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockStats: DashboardStats = {
      totalUsers: 1250,
      activeUsers: 342,
      totalPosts: 5678,
      totalComments: 12345,
    };
    
    setState(prev => ({ ...prev, stats: mockStats }));
  };

  const fetchRecentActivities = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockActivities: RecentActivity[] = [
      {
        id: '1',
        type: 'user_joined',
        message: '새로운 사용자가 가입했습니다.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        userId: 'user1',
        userName: '김철수',
      },
      {
        id: '2',
        type: 'post_created',
        message: '새로운 게시글이 작성되었습니다.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        userId: 'user2',
        userName: '이영희',
      },
      {
        id: '3',
        type: 'comment_added',
        message: '새로운 댓글이 추가되었습니다.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        userId: 'user3',
        userName: '박민수',
      },
      {
        id: '4',
        type: 'user_joined',
        message: '새로운 사용자가 가입했습니다.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        userId: 'user4',
        userName: '최지영',
      },
    ];
    
    setState(prev => ({ ...prev, recentActivities: mockActivities }));
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await Promise.all([
        fetchStats(),
        fetchRecentActivities(),
      ]);
      
      setState(prev => ({ ...prev, loading: false }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: '대시보드 데이터를 불러오는데 실패했습니다.',
        loading: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    ...state,
    refetch: fetchDashboardData,
  };
};
