"use client";
import { log } from "console";
import { useState, useEffect, use } from "react";
import { api } from "../../services/api";
//representa tipo elemento existente no array item
interface Product {
  id: number;
  nome: string;
}
//função retorna a função/ roda o codigo
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [items, setItens] = useState<Product[]>([]);
  // const data = {nome: textInput};

  /**
 * Função responsável por carregar itens no sistema.
 *
 * Esta função realiza as operações necessárias para carregar
 * e exibir os itens no sistema. Pode incluir chamadas a APIs,
 * manipulação do estado da aplicação, etc.
 *
 * @param {TipoDoParametro} nomeDoParametro - Descrição do parâmetro, se houver.
 * @returns {TipoDoRetorno} - Descrição do que a função retorna, se houver.
 *
 * Exemplo de uso:
 * loadingitens();
 */

  //quando ocorrer um evento qualquer a função loadingitens vai rodar
  useEffect(() => {
    loadItems();
  }, []);
//demostração comofunciona
  useEffect(() => {
    console.log("O código está passando por aqui");
  }, [textInput]);

/**
 * Função assíncrona responsável por carregar itens.
 *
 * Esta função realiza operações assíncronas para buscar e carregar
 * itens, como chamadas a APIs ou operações de leitura assíncronas.
 *
 * @param {TipoDoParametro} nomeDoParametro - Descrição do parâmetro, se houver.
 * @returns {Promise<TipoDoRetorno>} - Promessa que representa o resultado do carregamento.
 *
 * Exemplo de uso:
 * const items = await loadItems(parametro);
 */
  async function loadItems() {
    setLoading(true);
    setTimeout(async()=>{
      try {
        const response = await api.get("/produtos");
        console.log(response);
        setItens(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
      finally {
        setLoading(false);
      }
    }, 2000)
    
  }
//essa função serve para add um elemento na lista do servidor
/**
 * Função assíncrona responsável por carregar itens.
 *
 * Esta função realiza operações assíncronas para buscar e carregar
 * itens, como chamadas a APIs ou operações de leitura assíncronas.
 *
 * @param {TipoDoParametro} nomeDoParametro - Descrição do parâmetro, se houver.
 * @returns {Promise<TipoDoRetorno>} - Promessa que representa o resultado do carregamento.
 *
 * Exemplo de uso:
 * const items = await loadItems(parametro);
 */


  async function handleAddItem() {
    console.log(textInput);
    const data = { nome: textInput };
    /**
 * Função assíncrona responsável por lidar com a adição de um novo item.
 *
 * Esta função realiza operações assíncronas relacionadas à adição de um novo item,
 * como interações com APIs, validações e atualizações de estado.
 *
 * @param {TipoDoParametro} parametro - Descrição do parâmetro, se houver.
 * @returns {Promise<TipoDoRetorno>} - Promessa que representa o resultado da operação.
 *
 * Exemplo de uso:
 * const resultado = await handleAddItem(parametro);
 */

    try {
      const response = await api.post("/produtos", data);

      loadItems();
      console.log("Sucess:", response);
    } catch (error) {
      console.log("Error:", error);
    } 
  }
//essa função serve para retornar o id do elemento especifico no console

  function handleDeleteItem(idemId: number) {
    console.log(idemId);
  }

  return (
    <main>
      <div style={{ marginBottom: 10 }}>
        <input
          onChange={(e) => setTextInput(e.target.value)}
          type="text"
          placeholder="Digite seu texto aqui..."
        />
        <button onClick={handleAddItem}>Enviar</button>
      </div>
      <span>{loading && "Carregando.."}</span>

      <ul> {/*retorna os elementos do servidor  */}
        {items.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}