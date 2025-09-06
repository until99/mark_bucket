import { XIcon } from "@phosphor-icons/react";
import { Header } from "../layout/Header";
import { Main } from "../layout/Main";
import { Dialog } from "../components/Dialog";
import { useModal } from "../hooks/Modal";
import { useProducts } from "../hooks/useProducts";
import { useCheckboxSelection } from "../hooks/useCheckboxSelection";
import { useProductForm } from "../hooks/useProductForm";
import { Form } from "../components/Form";
import { InputGroup } from "../components/InputGroup";
import { Button } from "../components/Button";
import { Footer } from "../layout/Footer";
import { Table } from "../components/Table";

function App() {
  const { dialogRef, showModal, close } = useModal();
  const { productsList, addProduct, markProductsAsPurchased } = useProducts();
  const {
    selectedCheckboxes,
    isFooterVisible,
    handleCheckboxChange,
    resetSelection
  } = useCheckboxSelection();
  const { isSubmitting, handleAddProduct } = useProductForm();

  const handleConfirm = async () => {
    const success = await markProductsAsPurchased(selectedCheckboxes);
    if (success) {
      resetSelection();
    }
  };

  const handleCancel = () => {
    resetSelection();
  };

  const onSubmitProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleAddProduct(
      event,
      addProduct,
      () => {
        closeDialog();
      }
    );
  };

  const openDialog = () => {
    showModal();
  };

  const closeDialog = () => {
    close();
  };

  return (
    <>
      <Header />
      <Main>
        <Dialog ref={dialogRef} onClose={closeDialog}>
          <div className="flex items-center justify-between mb-4">
            <h2>Adicionar Produto</h2>
            <XIcon
              onClick={closeDialog}
              cursor="pointer"
              color="white"
              size={32}
            />
          </div>

          <Form onSubmit={onSubmitProduct}>
            <InputGroup label="Nome" name="nome" placeholder="Nome do Produto" required />
            <InputGroup label="Qtd" name="quantidade" placeholder="Quantidade" type="number" min={0} value={1} required />
            <InputGroup label="Marca" name="marca" placeholder="Marca" />
            <InputGroup label="Preço" name="preco" placeholder="Preço" pattern="^\d+(\.\d{1,2})?$" inputMode="decimal" value={0.00} required />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adicionando..." : "Adicionar"}
            </Button>
          </Form>

        </Dialog>

        <Table
          data={productsList}
          columns={["Produto", "Qtd", "Marca", "Preço", "Comprado"]}
          onCheckboxChange={handleCheckboxChange}
          selectedCheckboxes={selectedCheckboxes}
        />
      </Main>
      <Footer>

        {isFooterVisible ? (
          <>

            <Button onClick={handleCancel}>
              Cancelar
            </Button>

            <Button onClick={handleConfirm}>
              Confirmar
            </Button>

          </>
        ) : (

          <Button onClick={openDialog}>
            Adicionar
          </Button>

        )}

      </Footer >
    </>
  );
}

export default App;
