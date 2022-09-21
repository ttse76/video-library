import Head from "next/head";
import Container from 'react-bootstrap/Container';

export default function PageWrapper({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title ? title : 'Video Library'}</title>
      </Head>
      <Container>
        {children}
      </Container>
    </div>
  );
}