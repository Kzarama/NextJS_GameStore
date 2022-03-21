import Head from "next/head";

export default function Seo(props: any) {
  const { title, description } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
};

Seo.defaultProps = {
  title: "GameStore - Tus juegos favotitos.",
  description: "Tus juegos favoritos para Steam, PlayStation, Xbox y Switch al mejor precio.",
};
