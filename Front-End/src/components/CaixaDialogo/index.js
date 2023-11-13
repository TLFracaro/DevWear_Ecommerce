import React from 'react';

const ModalCadastro = ({ showModal, fecharModal, texto }) => {
  return (
    showModal && (
      <div className="modal">
        <p>{texto}</p>
        <button onClick={fecharModal}>OK</button>
      </div>
    )
  );
};

export default ModalCadastro;
