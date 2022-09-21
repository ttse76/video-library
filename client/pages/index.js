import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";
import { signOut } from 'next-auth/react';

import PageWrapper from "components/document/PageWrapper";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function Home({ username }) {
  const button = username ? <Button type="button" onClick={() => signOut()}>Logout {username}</Button> : <></>;
  return (
    <PageWrapper>
      <Row>
        <Col>
          {button}
        </Col>
      </Row>
    </PageWrapper>
  )
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

  const props = {};

  if (session) {
    props['username'] = session.user.username;
  }

  return {
    props: props
  }
}
