﻿using Sistema.Models;
using System.Data.SqlClient;

namespace Sistema.DAO
{
    public class DAOPaises : Sistema.DAO.DAO
    {

        public List<Paises> GetPaises()
        {
            try
            {
                var sql = this.Search(null, null);
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);
                reader = SqlQuery.ExecuteReader();
                var list = new List<Paises>();

                while (reader.Read())
                {
                    var pais = new Paises
                    {
                        idPais = Convert.ToInt32(reader["idPais"]),
                        nmPais = Convert.ToString(reader["nmPais"]),
                        sigla = Convert.ToString(reader["sigla"]),
                        DDI = Convert.ToString(reader["DDI"]),       
                        dtCadastro = Convert.ToDateTime(reader["dtCadastro"]),
                        dtUltAlteracao = Convert.ToDateTime(reader["dtUltAlteracao"])
                    };

                    list.Add(pais);
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

        public void Insert(Models.Paises pais)
        {
            try
            {
                var sql = string.Format("INSERT INTO tbPaises (nmPais, DDI, sigla, dtCadastro, dtUltAlteracao) VALUES (@nmPais, @DDI, @sigla, @dtCadastro, @dtUltAlteracao)");
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);
                SqlQuery.Parameters.Add(new SqlParameter("@nmPais", pais.nmPais));
                SqlQuery.Parameters.Add(new SqlParameter("@DDI", pais.DDI));
                SqlQuery.Parameters.Add(new SqlParameter("@sigla", pais.sigla));
                SqlQuery.Parameters.Add(new SqlParameter("@dtCadastro", DateTime.Now));
                SqlQuery.Parameters.Add(new SqlParameter("@dtUltAlteracao", DateTime.Now));
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

        public bool Update(Models.Paises pais)
        {
            try
            {
                string sql = "UPDATE tbPaises SET nmPais = '"
                    + pais.nmPais + "'," +
                    " DDI = '" + pais.DDI + "'," +
                    " sigla = '" + pais.sigla + "'," +
                    " dtUltAlteracao = '" + DateTime.Now.ToString("yyyy-MM-dd")
                    + "' WHERE idPais = " + pais.idPais;
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);

                int i = SqlQuery.ExecuteNonQuery();

                if (i > 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
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

        public Paises GetPais(int? idPais)
        {
            try
            {
                var model = new Models.Paises();
                if (idPais != null)
                {
                    OpenConnection();
                    var sql = this.Search(idPais, null);
                    SqlQuery = new SqlCommand(sql, con);
                    reader = SqlQuery.ExecuteReader();
                    while (reader.Read())
                    {
                        model.idPais = Convert.ToInt32(reader["idPais"]);
                        model.nmPais = Convert.ToString(reader["nmPais"]);
                        model.DDI = Convert.ToString(reader["DDI"]);
                        model.sigla = Convert.ToString(reader["sigla"]);
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

        public bool Delete(int? idPais)
        {
            try
            {
                string sql = "DELETE FROM tbPaises WHERE idPais = " + idPais;
                OpenConnection();
                SqlQuery = new SqlCommand(sql, con);

                int i = SqlQuery.ExecuteNonQuery();

                if (i > 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
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
                swhere = " WHERE idPais = " + id;
            }
            if (!string.IsNullOrEmpty(filter))
            {
                var filterQ = filter.Split(' ');
                foreach (var word in filterQ)
                {
                    swhere += " OR tbPaises.nmPais LIKE'%" + word + "%'";
                }
                swhere = " WHERE " + swhere.Remove(0, 3);
            }
            sql = @"
                    SELECT
                        idPais AS idPais,
                        nmPais AS nmPais,
                        DDI AS DDI,
                        sigla AS sigla,
                        dtCadastro AS dtCadastro,
                        dtUltAlteracao AS dtUltAlteracao
                    FROM tbPaises" + swhere;
            return sql;
        }
    }
}
