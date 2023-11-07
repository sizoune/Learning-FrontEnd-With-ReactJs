import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action.js';
import ThreadDetail from '../components/ThreadDetail.jsx';
import ErrorDialog from '../components/ErrorDialog.jsx';
import { hideErrorActionCreator } from '../states/isError/action.js';

function ThreadDetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
    error,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  return (
    <>
      {error.isError && (
        <ErrorDialog
          onClose={() => dispatch(hideErrorActionCreator())}
          errorMessage={error.errorMessage}
        />
      )}
      <ThreadDetail
        ownerName={threadDetail.owner.name}
        ownerAvatar={threadDetail.owner.avatar}
        authUser={authUser}
        {...threadDetail}
      />
    </>

  );
}

export default ThreadDetailPage;
