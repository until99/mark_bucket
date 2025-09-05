import { useEffect, useState } from "react";
import "../../public/stylesheets/App.css";
import supabase from "../../services/api/supabase";
import type { Product } from "../../services/api/supabase";
import { XIcon } from "@phosphor-icons/react";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [initialSelectedCheckboxes, setInitialSelectedCheckboxes] = useState<
    number[]
  >([]);
  const [productsList, setProductsList] = useState<Product[]>([]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    let updated;
    if (checked) {
      updated = [...selectedCheckboxes, id];
    } else {
      updated = selectedCheckboxes.filter((item) => item !== id);
    }
    setSelectedCheckboxes(updated);

    const hasChanges =
      JSON.stringify(updated.sort()) !==
      JSON.stringify(initialSelectedCheckboxes.sort());
    setIsFooterVisible(hasChanges);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("purchased", false);
    if (error) {
      console.error("Erro ao buscar produtos:", error);
      return;
    }

    setProductsList(
      data
        .map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          brand: item.brand,
          price: item.price,
          purchased: item.purchased,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }))
        .sort((a, b) => a.id - b.id)
    );

    // Como só carregamos produtos não comprados, inicializar vazios
    setSelectedCheckboxes([]);
    setInitialSelectedCheckboxes([]);
    setIsFooterVisible(false);
  };

  const handleConfirm = async () => {
    // Marcar como comprado no banco de dados
    if (selectedCheckboxes.length > 0) {
      const { error } = await supabase
        .from("products")
        .update({ purchased: true })
        .in("id", selectedCheckboxes);

      if (error) {
        console.error("Erro ao atualizar produtos:", error);
        return;
      }
    }

    // Remover os itens selecionados da lista local (mas não do banco)
    const updatedList = productsList.filter(
      (product) => !selectedCheckboxes.includes(product.id)
    );
    setProductsList(updatedList);

    // Resetar estados
    setSelectedCheckboxes([]);
    setInitialSelectedCheckboxes([]);
    setIsFooterVisible(false);
  };

  const handleCancel = () => {
    setSelectedCheckboxes(initialSelectedCheckboxes);
    setIsFooterVisible(false);
  };

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const productData = {
      name: formData.get("nome") as string,
      quantity: parseInt(formData.get("quantidade") as string),
      brand: formData.get("marca") as string,
      price: parseFloat(formData.get("preco") as string),
      purchased: false,
    };

    const { error } = await supabase.from("products").insert([productData]);

    if (error) {
      console.error("Erro ao adicionar produto:", error);
      return;
    }

    // Limpar o formulário e fechar o modal
    form.reset();
    setIsDialogOpen(false);

    // Recarregar a lista de produtos
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <header>
        <h1>Mark Bucket</h1>
        <button onClick={() => setIsDialogOpen(true)}>Adicionar</button>
      </header>
      <main>
        <dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <div className="container">
            <h2>Adicionar Produto</h2>
            <XIcon
              onClick={() => setIsDialogOpen(false)}
              cursor="pointer"
              color="white"
              size={32}
            />
          </div>

          <form onSubmit={handleAddProduct}>
            <div className="input-group">
              <label htmlFor="nome">Nome *</label>
              <input type="text" id="nome" name="nome" required />
            </div>

            <div className="input-group">
              <label htmlFor="quantidade">Qtd *</label>
              <input
                type="number"
                id="quantidade"
                min={0}
                name="quantidade"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="marca">Marca</label>
              <input type="text" id="marca" name="marca" required />
            </div>

            <div className="input-group">
              <label htmlFor="preco">Preço *</label>
              <input
                type="text"
                id="preco"
                name="preco"
                pattern="^\d+(\.\d{1,2})?$"
                inputMode="decimal"
                required
                placeholder="Ex: 10.99"
              />
            </div>

            <button type="submit">Adicionar</button>
          </form>
        </dialog>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Marca</th>
              <th>Preço</th>
              <th>Comprado</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((element) => {
              const isSelected = selectedCheckboxes.includes(element.id);
              const isPurchased = element.purchased;
              const cellData = [
                element.name,
                element.quantity,
                element.brand,
                `R$ ${element.price.toFixed(2)}`,
              ];

              return (
                <tr key={element.id}>
                  {cellData.map((data, idx) => (
                    <td
                      key={idx}
                      style={
                        isSelected || isPurchased
                          ? { textDecoration: "line-through" }
                          : {}
                      }
                    >
                      {data}
                    </td>
                  ))}
                  <td>
                    <input
                      type="checkbox"
                      name={`produto${element.id}`}
                      id={`produto${element.id}`}
                      checked={Boolean(isSelected)}
                      onChange={(e) =>
                        handleCheckboxChange(element.id, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      {isFooterVisible && (
        <footer>
          <button onClick={handleCancel} className="cancel-button">
            Cancelar
          </button>
          <button onClick={handleConfirm} className="confirm-button">
            Confirmar
          </button>
        </footer>
      )}
    </>
  );
}

export default App;
