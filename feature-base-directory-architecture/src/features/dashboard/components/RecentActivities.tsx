import React from 'react';
import { RecentActivity } from '../types';
import { formatRelativeTime } from '../../../shared/utils';
import Card from '../../../shared/components/Card';

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_joined':
        return '👤';
      case 'post_created':
        return '📝';
      case 'comment_added':
        return '💬';
      default:
        return '📌';
    }
  };

  return (
    <Card title="최근 활동">
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 text-2xl">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                {activity.userName && (
                  <p className="text-sm text-gray-500">by {activity.userName}</p>
                )}
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500">
                {formatRelativeTime(activity.timestamp)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">최근 활동이 없습니다.</p>
      )}
    </Card>
  );
};

export default RecentActivities;
