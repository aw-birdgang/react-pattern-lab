'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@/infrastructure/container/Container';
import { usePosts } from '@/features/post/presentation/hooks/usePosts';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export default function PostsPage() {
  const container = Container.getInstance();
  const postRepository = container.getPostRepository();
  const { posts, loading, error, getPosts, loadMore, hasMore, clearError } = usePosts(postRepository);
  
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Post['status'] | 'all'>('all');

  // Mock posts data for demonstration
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Getting Started with Clean Architecture',
        content: 'Clean Architecture is a software design philosophy that emphasizes separation of concerns and dependency inversion...',
        authorId: '1',
        authorName: 'John Doe',
        status: 'published',
        tags: ['architecture', 'clean-code', 'best-practices'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        publishedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Feature Base Architecture in React',
        content: 'Feature Base Architecture organizes code by business features rather than technical layers...',
        authorId: '2',
        authorName: 'Jane Smith',
        status: 'published',
        tags: ['react', 'architecture', 'feature-base'],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        publishedAt: new Date('2024-01-20'),
      },
      {
        id: '3',
        title: 'Advanced TypeScript Patterns',
        content: 'TypeScript provides powerful type system features that can help build more robust applications...',
        authorId: '3',
        authorName: 'Bob Johnson',
        status: 'draft',
        tags: ['typescript', 'patterns', 'advanced'],
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25'),
      },
      {
        id: '4',
        title: 'State Management with Zustand',
        content: 'Zustand is a small, fast and scalable state management solution...',
        authorId: '1',
        authorName: 'John Doe',
        status: 'published',
        tags: ['zustand', 'state-management', 'react'],
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-01-30'),
        publishedAt: new Date('2024-01-30'),
      },
      {
        id: '5',
        title: 'Testing Strategies for React Apps',
        content: 'Comprehensive testing is essential for maintaining code quality and preventing regressions...',
        authorId: '2',
        authorName: 'Jane Smith',
        status: 'archived',
        tags: ['testing', 'react', 'quality'],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        publishedAt: new Date('2024-02-01'),
      },
    ];
    setAllPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  // Filter posts based on search query and status
  useEffect(() => {
    let filtered = allPosts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    setFilteredPosts(filtered);
  }, [allPosts, searchQuery, statusFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: Post['status'] | 'all') => {
    setStatusFilter(status);
  };

  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLoadMore = () => {
    // In a real app, this would call the API
    console.log('Loading more posts...');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Posts Management
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrating Feature Base Architecture with Post management
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Search Posts"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by title, content, author, or tags..."
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value as Post['status'] | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Posts List</CardTitle>
            <span className="text-sm text-gray-500">
              {filteredPosts.length} posts found
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mb-3">
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>By {post.authorName}</span>
                          <span>•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          {post.publishedAt && (
                            <>
                              <span>•</span>
                              <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}
                      >
                        {post.status}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {hasMore && (
            <div className="text-center mt-6">
              <Button onClick={handleLoadMore} variant="outline">
                Load More Posts
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Architecture Info */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Base Architecture - Post Feature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Post Feature Structure:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>domain/entities/Post.ts</code> - Post business entities</li>
                <li>• <code>usecase/GetPostsUseCase.ts</code> - Business logic</li>
                <li>• <code>repository/PostRepository.ts</code> - Data access interface</li>
                <li>• <code>infrastructure/HttpPostRepository.ts</code> - HTTP implementation</li>
                <li>• <code>presentation/hooks/usePosts.ts</code> - React hooks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Advanced Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Search and filtering capabilities</li>
                <li>• Pagination and infinite scroll</li>
                <li>• Status-based filtering</li>
                <li>• Tag-based organization</li>
                <li>• Author relationship management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
