import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList.jsx';
import asyncPopulateUsersAndThreads from '../states/shared/action.js';
import CategoryList from '../components/CategoryList.jsx';

function DashboardPage() {
  const authUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);
  const threads = useSelector((state) => state.threads);
  const isLoading = useSelector((state) => state.isLoading);

  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const originThreadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const filteredThread = originThreadList.filter(
    (thread) => thread.category.includes(selectedCategory),
  );

  const threadCategory = originThreadList.reduce((acc, thread) => {
    if (!acc[thread.category]) {
      acc[thread.category] = [];
    }
    acc[thread.category].push(thread);
    return acc;
  }, {});

  const categoryClickHandler = ({ name, isCurrentlySelected }) => {
    setSelectedCategory(isCurrentlySelected ? '' : name);
  };

  return (
    <div className="container lg:px-40 sm:px-8">
      <CategoryList
        currentCategory={selectedCategory}
        onCategoryClick={categoryClickHandler}
        categories={Object.keys(threadCategory)}
      />
      <h1 className="text-3xl font-bold mb-5">Diskusi Tersedia</h1>
      <ThreadList
        isLoading={isLoading}
        threads={filteredThread}
      />
    </div>
  );
}

export default DashboardPage;
