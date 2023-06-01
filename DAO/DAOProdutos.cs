﻿using Sistema.Models;
using System.Data.SqlClient;

namespace Sistema.DAO
{
    public class DAOProdutos : DAO
    {
        public List<Produtos> GetProdutos()
        {
            try
            {
                var sql = this.Search(null, null);
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);
                reader = SqlQuery.ExecuteReader();
                var list = new List<Produtos>();

                while (reader.Read())
                {
                    var produto = new Produtos
                    {
                        idProduto = Convert.ToInt32(reader["idProduto"]),
                        dsProduto = Convert.ToString(reader["dsProduto"]),
                        idCategoria = Convert.ToInt32(reader["idCategoria"]),
                        flUnidade = Convert.ToString(reader["flUnidade"]),
                        cdNCM = Convert.ToString(reader["cdNCM"]),
                        cdCFOP = Convert.ToString(reader["cdCFOP"]),
                        qtdEstoque = Convert.ToInt32(reader["qtdEstoque"]),
                        vlCusto = Convert.ToDecimal(reader["vlCusto"]),
                        vlVenda = Convert.ToDecimal(reader["vlVenda"]),
                        observacao = Convert.ToString(reader["observacao"]),
                        dtCadastro = Convert.ToDateTime(reader["dtCadastro"]),
                        dtUltAlteracao = Convert.ToDateTime(reader["dtUltAlteracao"])
                    };

                    list.Add(produto);
                }

                return list;
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
            finally
            {
                CloseConnection();
            }
        }

        public void Insert(Models.Produtos produto)
        {
            try
            {
                var sql = string.Format("INSERT INTO tbProdutos (dsProduto, idCategoria, flUnidade, cdNCM, cdCFOP, qtdEstoque, vlCusto, vlVenda, observacao, dtCadastro, dtUltAlteracao) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}')",
                                        produto.dsProduto,
                                        Convert.ToInt32(produto.idCategoria),
                                        produto.flUnidade,
                                        produto.cdNCM,
                                        produto.cdCFOP,
                                        Convert.ToInt32(produto.qtdEstoque),
                                        Convert.ToDecimal(produto.vlCusto),
                                        Convert.ToDecimal(produto.vlVenda),
                                        produto.observacao,
                                        DateTime.Now.ToString("dd/MM/yyyy"),
                                        DateTime.Now.ToString("dd/MM/yyyy")
                                    );
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);
                SqlQuery.ExecuteNonQuery();
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
            finally
            {
                CloseConnection();
            }
        }

        public void Update(Models.Produtos produto)
        {
            try
            {
                string sql = "UPDATE tbProdutos SET dsProduto = '"
                    + produto.dsProduto + "'," +
                    " idCategoria = '" + Convert.ToInt32(produto.idCategoria) + "'," +
                    " flUnidade = '" + produto.dsProduto + "'," +
                    " cdNCM = '" + produto.cdNCM + "'," +
                    " qtdEstoque = '" + Convert.ToInt32(produto.qtdEstoque) + "'," +
                    " vlCusto = '" + Convert.ToDecimal(produto.vlCusto) + "'," +
                    " vlVenda = '" + Convert.ToDecimal(produto.vlVenda) + "'," +
                    " observacao = '" + produto.observacao + "'," +
                    " dtUltAlteracao = '" + DateTime.Now.ToString("dd/MM/yyyy")
                    + "' WHERE idProduto = " + produto.idProduto;
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);
                SqlQuery.ExecuteNonQuery();
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
            finally
            {
                CloseConnection();
            }
        }

        public Produtos GetProduto(int? idProduto)
        {
            try
            {
                var model = new Models.Produtos();
                if (idProduto != null)
                {
                    OpenConnection();
                    var sql = this.Search(idProduto, null);
                    SqlQuery = new SqlCommand(sql, con);
                    reader = SqlQuery.ExecuteReader();
                    while (reader.Read())
                    {
                        model.idProduto = Convert.ToInt32(reader["idProduto"]);
                        model.dsProduto = Convert.ToString(reader["dsProduto"]);
                        model.idCategoria = Convert.ToInt32(reader["idCategoria"]);
                        model.flUnidade = Convert.ToString(reader["flUnidade"]);
                        model.cdNCM = Convert.ToString(reader["cdNCM"]);
                        model.cdCFOP = Convert.ToString(reader["cdCFOP"]);
                        model.qtdEstoque = Convert.ToInt32(reader["qtdEstoque"]);
                        model.vlCusto = Convert.ToDecimal(reader["vlCusto"]);
                        model.vlVenda = Convert.ToDecimal(reader["vlVenda"]);
                        model.observacao = Convert.ToString(reader["observacao"]);
                        model.dtCadastro = Convert.ToDateTime(reader["dtCadastro"]);
                        model.dtUltAlteracao = Convert.ToDateTime(reader["dtUltAlteracao"]);
                    }
                }
                return model;
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
            finally
            {
                CloseConnection();
            }
        }

        public void Delete(int? idProduto)
        {
            try
            {
                string sql = "DELETE FROM tbProdutos WHERE idProduto = " + idProduto;
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);
                SqlQuery.ExecuteNonQuery();
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
            finally
            {
                CloseConnection();
            }
        }

        private string Search(int? id, string filter)
        {
            var sql = string.Empty;
            var swhere = string.Empty;
            if (id != null)
            {
                swhere = " WHERE idProduto = " + id;
            }
            if (!string.IsNullOrEmpty(filter))
            {
                var filterQ = filter.Split(' ');
                foreach (var word in filterQ)
                {
                    swhere += " OR tbProdutos.dsProduto LIKE'%" + word + "%'";
                }
                swhere = " WHERE " + swhere.Remove(0, 3);
            }
            sql = @"
                    SELECT
                        idProduto AS idProduto,
                        dsProduto AS dsProduto,
                        idCategoria AS idCategoria,
                        flUnidade AS flUnidade,
                        cdNCM AS cdNCM,
                        cdCFOP AS cdCFOP,
                        qtdEstoque AS qtdEstoque,
                        vlCusto AS vlCusto,
                        vlVenda AS vlVenda,
                        observacao AS observacao,
                        dtCadastro AS dtCadastro,
                        dtUltAlteracao AS dtUltAlteracao
                    FROM tbProdutos" + swhere;
            return sql;
        }
    }
}
