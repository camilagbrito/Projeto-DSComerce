import "./style.css";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";
import * as productService from "../../../services/product-service";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import SeachBar from "../../../components/SearchBar";
import ButtonNextPage from "../../../components/ButtonNextPage";
import DiaLogInfo from "../../../components/DialogInfo";
import DiaLogConfirmation from "../../../components/DialogConfirmation";
import {useNavigate } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";

type QueryParams = {
  page: number;
  name: string;
};

export default function ProductListing() {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  const navigate = useNavigate();

  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Operação com sucesso!"
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    id: 0,
    message: "Tem certeza?"
  });

  const [isLastPage, setIsLastPage] = useState(false);

  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        const nextPage = response.data.content;
        setProducts(products.concat(nextPage));
        setIsLastPage(response.data.last);
      });
  }, [queryParams]);

  function handleNewProductClick(){
    navigate("/admin/products/create");
  }

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParams({ ...queryParams, page: 0, name: searchText });
  }

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  function handleDialogInfoClose(){
    setDialogInfoData({...dialogInfoData, visible:false});
  }

  function handleDeleteCLick(productId : number){
    setDialogConfirmationData({...dialogConfirmationData, id: productId, visible:true});
  }

  function handleUpdateClick(productId: number){
    navigate(`/admin/products/${productId}`)
  }

  function handleDialogConfirmationAnswer(answer : boolean, productId: number){
    if(answer){
      productService.deleteById(productId)
      .then(() => {
        setProducts([]);
        setQueryParams({...queryParams, page: 0});
      })
      .catch(error => {
        setDialogInfoData({visible: true, message: error.response.data.error});
      });
      
    }
    console.log("Resposta", answer);
    setDialogConfirmationData({...dialogConfirmationData, visible:false});
  }

  return (
    <main>
      <section id="product-listing-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

        <div className="dsc-btn-page-container dsc-mb20">
          <div onClick={handleNewProductClick}>
            <ButtonInverse text="Novo" />
          </div>
        </div>

        <SeachBar onSearch={handleSearch} />

        <table className="dsc-table dsc-mb20 dsc-mt20">
          <thead>
            <tr>
              <th className="dsc-tb576">ID</th>
              <th></th>
              <th className="dsc-tb768">Preço</th>
              <th className="dsc-txt-left">Nome</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="dsc-tb576">{product.id}</td>
                <td>
                  <img
                    className="dsc-product-listing-image"
                    src={product.imgUrl}
                    alt={product.name}
                  />
                </td>
                <td className="dsc-tb768">{product.price.toFixed(2)}</td>
                <td className="dsc-txt-left">{product.name}</td>
                <td>
                  <img onClick={() => handleUpdateClick(product.id)}
                    className="dsc-product-listing-btn"
                    src={editIcon}
                    alt="Editar"
                  />
                </td>
                <td>
                  <img onClick={() => handleDeleteCLick(product.id)}
                    className="dsc-product-listing-btn"
                    src={deleteIcon}
                    alt="Deletar"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLastPage && (
          <div>
            <ButtonNextPage onNextPage={handleNextPageClick} />
          </div>
        )}
      </section>

      {
        dialogInfoData.visible &&
        <DiaLogInfo message={dialogInfoData.message} onDialogClose={handleDialogInfoClose}/>
      }

      {
        dialogConfirmationData.visible &&
        <DiaLogConfirmation id = {dialogConfirmationData.id} message={dialogConfirmationData.message} onDialogAnswer={handleDialogConfirmationAnswer}/>
      }
   
    </main>
  );
}
