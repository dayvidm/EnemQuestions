"use client";


import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/auth'
import CardComponent from "../../components/CardComponent";

const Dashboard = () => {
  const [value, setValue] = useState("1");
  const { user } = useAuth({ middleware: 'auth' });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const titleCardPadrao = "Simulado Padrão";
  const descriptionCardPadrao = "Nesta opção voce pode realizar um simulado padrão com questões na sequencia de uma prova do enem. Não há limite de tempo para a realização do simulado.";

  const titleCardRapido = "Simulado Rápido";
  const descriptionCardRapido = "Nesta opção voce pode realizar um simulado com 10 questões aleatorias e de qualquer materia. Não há limite de tempo para a realização do simulado.";

  const handleStartSimuladoPadrao = () => {
    router.push('/question?type=padrao');
  };

  const handleStartSimuladoRapido = () => {
    router.push('/question?type=rapido');
  };

  return (
    <>
      <CardComponent title={titleCardPadrao} description={descriptionCardPadrao} buttonText2="Iniciar Simulado" onClick={() => { alert('yrdyr') }} />
      <CardComponent title={titleCardRapido} description={descriptionCardRapido} buttonText2="Iniciar Simulado" onClick={handleStartSimuladoRapido} />
    </>
  );
};

export default Dashboard;