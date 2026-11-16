import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  calcularResultado,
  desfazerUltimoVoto,
  obterVotos,
  zerarVotos,
} from '../services/votacaoService';

function formatarPercentual(valor) {
  return valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%';
}

function formatarVotos(quantidade) {
  return `${quantidade} ${quantidade === 1 ? 'voto' : 'votos'}`;
}

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = votos.length;
  const resultado = calcularResultado(votos);
  // O primeiro da lista é o Craque do Jogo e o segundo é o vice
  const craque = resultado[0];
  const vice = resultado[1];
  const vantagem = craque.votos - vice.votos;

  function classeDoItem(indice) {
    if (indice === 0) return 'placar-item placar-craque';
    if (indice === 1) return 'placar-item placar-vice';
    return 'placar-item';
  }

  function handleDesfazer() {
    setVotos(desfazerUltimoVoto());
  }

  function handleZerar() {
    if (window.confirm('Apagar todos os votos e reiniciar a votação?')) {
      zerarVotos();
      setVotos([]);
    }
  }

  return (
    <main className="pagina">
      <header className="pagina-cabecalho">
        <h1>Parcial: craque do jogo</h1>
        <p className="total-votos">
          <strong>{total.toLocaleString('pt-BR')}</strong> {total === 1 ? 'voto computado' : 'votos computados'}
        </p>
      </header>

      {total === 0 ? (
        <div className="vazio">
          <p>Nenhum voto ainda. Escolha o craque do jogo para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">Ir para a votação</Link>
        </div>
      ) : (
        <>
          <p className="disputa" aria-live="polite">
            {vantagem === 0
              ? `Empate na liderança: ${craque.nome} e ${vice.nome} têm ${formatarVotos(craque.votos)} cada.`
              : `${craque.nome} lidera com ${formatarVotos(vantagem)} de vantagem sobre ${vice.nome}.`}
          </p>

          <ol className="placar">
            {resultado.map((p, indice) => (
              <li key={p.id} className={classeDoItem(indice)}>
                <span className="placar-posicao">{indice + 1}º</span>
                <img src={p.foto} alt={p.nome} className="placar-foto" />
                <div className="placar-info">
                  <div className="placar-linha">
                    <span className="placar-nome">{p.nome}</span>
                    {indice === 0 && <span className="selo-placar selo-craque">Craque do jogo</span>}
                    {indice === 1 && <span className="selo-placar selo-vice">Vice</span>}
                  </div>
                  <div className="barra">
                    <div className="barra-preenchida" style={{ width: `${p.percentual}%` }} />
                  </div>
                  <span className="placar-numeros">
                    {formatarPercentual(p.percentual)} ({formatarVotos(p.votos)})
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div className="resultado-acoes">
            <button type="button" className="botao botao-desfazer" onClick={handleDesfazer}>
              Desfazer último voto
            </button>
            <button type="button" className="botao botao-zerar" onClick={handleZerar}>
              Zerar votação
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Resultado;
