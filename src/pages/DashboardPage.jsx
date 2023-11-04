import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dummyThreads } from '../utils/helper.js';
import ThreadList from '../components/ThreadList.jsx';
import asyncPopulateUsersAndThreads from '../states/shared/action.js';
import CategoryList from '../components/CategoryList.jsx';

function DashboardPage() {
  const {
    users = [],
    threads = dummyThreads,
    authUser,
    isLoading = true,
  } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVoteClick = (threadId) => {
    dispatch();
  };

  const onDownVoteClick = (threadId) => {

  };

  const originThreadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const filteredThread = originThreadList.filter(
    (thread) => thread.category.includes(selectedCategory),
  );

  const threadCategory = Object.groupBy(originThreadList, (thread) => thread.category);

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
        onUpVote={onUpVoteClick}
        onDownVote={onDownVoteClick}
      />
    </div>
  );
}

export default DashboardPage;
