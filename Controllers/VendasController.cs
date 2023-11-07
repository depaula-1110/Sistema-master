﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sistema.DAO;
using Sistema.Models;
using Sistema.Util;
using System.Reflection;

namespace Sistema.Controllers
{
    public class VendasController : Controller
    {
        public ActionResult Index()
        {
            try
            {
                var DAOVendas = new DAOVendas();
                List<Models.Vendas> list = DAOVendas.GetVendas(null);
                return View(list);
            }
            catch (Exception ex)
            {
                this.AddFlashMessage(ex.Message, FlashMessage.ERROR);
                return View();
            }
        }
        public ActionResult Create()
        {
            DAOFuncionarios daoFuncionarios = new();
            DAOProdutos daoProdutos = new();
            DAOCondicaoPgto daoCondicaoPgto = new();
            DAOClientes daoClientes = new();

            List<Funcionarios> listFunc = daoFuncionarios.GetFuncionarios();
            List<Produtos> listProd = daoProdutos.GetProdutos();
            List<CondicaoPgto> listCond = daoCondicaoPgto.GetCondicoesPgto();
            List<Clientes> listClientes = daoClientes.GetClientes();

            var lista = new Vendas
            {
                ListFuncionarios = listFunc.Select(u => new SelectListItem
                {
                    Value = u.id.ToString(),
                    Text = u.nmFuncionario.ToString(),
                    Selected = false
                }),
                ListClientes = listClientes.Select(u => new SelectListItem
                {
                    Value = u.id.ToString(),
                    Text = u.nmCliente.ToString(),
                    Selected = false
                }),
                ListProdutos = listProd.Select(u => new SelectListItem
                {
                    Value = u.idProduto.ToString(),
                    Text = u.dsProduto.ToString() + " - " + u.vlSaldo.ToString(),
                    Selected = false                    
                }),
                ListCondicaoPgto = listCond.Select(u => new SelectListItem
                {
                    Value = u.idCondicaoPgto.ToString(),
                    Text = u.dsCondicaoPgto.ToString(),
                    Selected = false
                })                
            };

            return View(lista);
        }
        
        [HttpPost]
        public ActionResult Create(Vendas model)
        {
            try
            {
                DAOVendas daoVenda = new();
                daoVenda.Insert(model);
                this.AddFlashMessage(AlertMessage.INSERT_SUCESS);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                this.AddFlashMessage(ex.Message, FlashMessage.ERROR);
                return View(model);
            }
        }
        public ActionResult Details(int idVenda, string nrModelo)
        {
            return this.GetView(idVenda, nrModelo);
        }
        public ActionResult Cancelar(int idVenda, string nrModelo)
        {
            return this.GetView(idVenda, nrModelo);
        }

        [HttpPost]
        public ActionResult Cancelar(int idVenda, string nrModelo, Models.Compras model)
        {
            try
            {
                DAOVendas daoVendas = new ();
                daoVendas.CancelarVenda(idVenda);
                this.AddFlashMessage("Registro cancelado com sucesso!");
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                this.AddFlashMessage(ex.Message, FlashMessage.ERROR);
                return this.GetView(idVenda, nrModelo);
            }
        }
        private ActionResult GetView(int idVenda, string nrModelo)
        {
            try
            {
                DAOVendas daoVendas = new();
                var model = daoVendas.GetVenda(idVenda, nrModelo);
                return View(model);
            }
            catch (Exception ex)
            {
                this.AddFlashMessage(ex.Message, FlashMessage.ERROR);
                return View();
            }
        }
    }
}
