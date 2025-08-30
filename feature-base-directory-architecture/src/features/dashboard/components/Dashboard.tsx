import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import StatsCard from './StatsCard';
import RecentActivities from './RecentActivities';
import Button from '../../../shared/components/Button';

const Dashboard: React.FC = () => {
  const { stats, recentActivities, loading, error, refetch } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">대시보드를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <Button
          onClick={refetch}
          className="mt-4"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>
      
      {stats && <StatsCard stats={stats} />}
      
      <RecentActivities activities={recentActivities} />
    </div>
  );
};

export default Dashboard;
