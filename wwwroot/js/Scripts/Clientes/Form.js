$(document).ready(function () {
    $("#flTipo").on('change', function () {
        if ($(this).val() == "") {
            $("#formDiv").css("display", "none");
        } else if ($(this).val() == "F") {
            $("#formDiv").css("display", "");
            $(".labelCPFCNPJ").text("CPF");
            $(".labelNmFantasia").text("Apelido");
            $(".labelRG_IE").text("RG");
            $(".labelDtNasc").text("Data de Nascimento");
            $("#nrCPFCNPJ").attr("placeholder", "___.___.___-__");
            $("#nrRG_IE").attr("placeholder", "__.___.___-_");
        } else {
            $("#formDiv").css("display", "");
            $(".labelCPFCNPJ").text("CNPJ");
            $(".labelNmFantasia").text("Nome Fantasia");
            $(".labelRG_IE").text("Inscr. Estadual");
            $(".labelDtNasc").text("Data de Funda��o");
            $("#nrCPFCNPJ").attr("placeholder", "__.___.___/____-__");
        };
    });

    $("#nrCPFCNPJ").on('keyup change', function () {
        if ($("#flTipo").val() == "F") {
            $("#nrCPFCNPJ").mask("999.999.999-99");
            $("#nrRG_IE").mask("99.999.999-9");
        }
        else {
            $("#nrCPFCNPJ").mask("99.999.999/9999-99");
        }
    });

    $("#nrRG_IE").on('keyup change', function () {
        if ($("#flTipo").val() == "F")
            $("#nrRG_IE").mask("99.999.999-9");
        else
            $("#nrRG_IE").mask("");
    });

    $("#nrCEP").on('keyup change', function () {
        $(this).mask("99999-999");
    });

    $("#nrTelefoneCelular").on('keyup change', function () {
        $(this).mask("(99) 99999-9999");
    });

    $("#nrTelefoneFixo").on('keyup change', function () {
        $(this).mask("(99) 9999-9999");
    });

    $("#dtNasc").on('keyup change', function () {
        $(this).mask("99/99/9999");
    });

    $("#flTipo").change();
    $("#nrCPFCNPJ").change();
    $("nrRG_IE").change();
    $("#nrCEP").change();
    $("#nrTelefoneCelular").change();
    $("#nrTelefoneFixo").change();

    $("#nrCEP").on('change', function () {
        if ($(this).val()) {
            Endereco.consultaCep($(this).val());
        }
    });

    // --------------------- CIDADES ------------------------
    // SELECIONAR
    $("#modal").on('show.bs.modal', function (e) {
        $("#txtTituloModal").html("Lista de Cidades");
        Cidades.SelecionarCidades(true);
        Cidades.CarregaLista();
    });

    $(document).on('click', '.selectCidade-btn', function () {
        var id = $(this).data('value');
        $("#idCidade").val(id);
        $("#btnFecharModal").click();
    });
    // ADICIONAR
    $("#btnMostrarAddCidade").on('click', function () {
        $.ajax({
            url: "/Estados/JsSearch",
            success: function (result) {
                if (result.length > 0) {

                    var options = result.map(function (el, i) {
                        return $("<option></option>").val(el.idEstado).text(el.nmEstado)
                    });
                    $('#idEstado').html(options);
                }
            }
        });
        Cidades.SelecionarCidades(false);
        Cidades.AddCidades(true);
        $("#txtTituloModal").html("Adicionar Cidade");
    });

    $("#btnSalvarAddCidade").on('click', function () {
        if (Cidades.validaForm()) {
            $.ajax({
                url: "/Cidades/JsAddCidade",
                data: {
                    nmCidade: $("#nmCidade").val(),
                    idEstado: $("#idEstado").val(),
                    DDD: $("#DDD").val()
                },
                success: function (result) {
                    if (result.success) {
                        var options = result.novaListaCidades.map(function (el, i) {
                            return $("<option></option>").val(el.idCidade).text(el.nmCidade)
                        });
                        $('#idCidade').html(options);

                        Cidades.limpaForm();
                        Cidades.AddCidades(false);
                        Cidades.SelecionarCidades(true);
                        Cidades.CarregaLista();
                    } else {
                        alert("Ocorreu um erro!");
                    }
                }
            });
        };
    });

    $("#btnEscondeAddCidade").on('click', function () {
        $("#txtTituloModal").html("Lista de Cidades");
        Cidades.limpaForm();
        Cidades.AddCidades(false);
        Cidades.SelecionarCidades(true);
    })

    // --------------------- ESTADOS ------------------------
    // SELECIONAR
    $("#btnMostraSelecionarEstados").on('click', function () { 
        $("#txtTituloModal").html("Lista de Estados")
        Cidades.SelecionarCidades(false);
        Cidades.AddCidades(false);
        Estados.SelecionarEstados(true);
        Estados.CarregaLista();
    });
    
    $(document).on('click', '.selectEstado-btn', function () {
        var id = $(this).data('value');
        $("#idEstado").val(id);
        $("#btnFecharModal").click();
    });

    // ADICIONAR
    $("#btnMostrarAddEstado").on('click', function () {
        $("#txtTituloModal").html("Adicionar Estado");
        $.ajax({
            url: "/Paises/JsSearch",
            success: function (result) {
                if (result.length > 0) {

                    var options = result.map(function (el, i) {
                        return $("<option></option>").val(el.idPais).text(el.nmPais)
                    });
                    $('#idPais').html(options);
                }
            }
        });
        Estados.SelecionarEstados(false);
        Estados.AddEstados(true);
    });

    $("#btnSalvarAddEstado").on('click', function () {
        if (Estados.validaForm()) {
            $.ajax({
                url: "/Estados/JsAddEstado",
                data: {
                    nmEstado: $("#nmEstado").val(),
                    UF: $("#UF").val(),
                    idPais: $("#idPais").val()
                },
                success: function (result) {
                    if (result.success) {
                        var options = result.novaListaEstados.map(function (el, i) {
                            return $("<option></option>").val(el.idEstado).text(el.nmEstado)
                        });
                        $('#idEstado').html(options);

                        Estados.limpaForm();
                        Estados.AddEstados(false);
                        Estados.SelecionarEstados(true);

                        Estados.CarregaLista();
                    } else {
                        alert("Ocorreu um erro!");
                    }
                }
            });
        };
    });

    $("#bntEscondeSelecionaEstado").on('click', function () {
        $("#txtTituloModal").html("Adicionar Cidade");
        Estados.SelecionarEstados(false);
        Cidades.AddCidades(true);
    });

    // --------------------- PAISES ------------------------
    $("#btnMostraSelecionarPaises").on('click', function () {
        $("#txtTituloModal").html("Lista de Pa�ses");
        Estados.SelecionarEstados(false);
        Estados.AddEstados(false);
        Paises.AddPaises(false);
        Paises.SelecionarPaises(true);
        Paises.CarregaLista();
    });

    // SELECIONAR   
    $(document).on('click', '.selectPais-btn', function () {
        var id = $(this).data('value');
        $("#idPais").val(id);
        Estados.AddEstados(true);
        Paises.SelecionarPaises(false);
    });
    // ADICIONAR
    $("#btnSalvarAddPais").on('click', function () {
        if (Paises.validaForm()) {
            $.ajax({
                url: "/Paises/JsAddPais",
                data: {
                    nmPais: $("#nmPais").val(),
                    sigla: $("#sigla").val(),
                    DDI: $("#DDI").val(),
                },
                success: function (result) {
                    if (result.success) {

                        var options = result.novaListaPaises.map(function (el, i) {
                            return $("<option></option>").val(el.idPais).text(el.nmPais)
                        });
                        $('#idPais').html(options);

                        Paises.limpaForm();
                        Paises.AddPaises(false);
                        Paises.SelecionarPaises(true);

                        Paises.CarregaLista();

                    } else {
                        alert("Ocorreu um erro!");
                    }
                }
            });
        };
    });
    $("#btnAddPais").on('click', function () {
        $("#txtTituloModal").html("Adicionar Pa�s");
        Paises.SelecionarPaises(false);
        Paises.AddPaises(true);
    });
    $("#btnFecharModalAddPais").on('click', function () {
        Paises.AddPaises(false);
        Paises.SelecionarPaises(true);
    });
    $("#btnEscondeAddPais").on('click', function () {
        $("#txtTituloModal").html("Lista de Pa�ses")
        Paises.limpaForm();
        Paises.AddPaises(false);
        Paises.SelecionarPaises(true);
    });
    $("#bntEscondeSelecionaPais").on('click', function () {
        $("#txtTituloModal").html("Adicionar Estado");
        Paises.SelecionarPaises(false);
        Estados.AddEstados(true);
    });
    $("#btnEscondeAddEstado").on('click', function () {
        $("#txtTituloModal").html("Lista de Estados");
        Estados.limpaForm();
        Estados.AddEstados(false);
        Estados.SelecionarEstados(true);
    });
    $('#modal').on('hide.bs.modal', function (e) {
        Paises.limpaForm();
        Paises.AddPaises(false);
        Paises.SelecionarPaises(false);
        Estados.limpaForm();
        Estados.AddEstados(false);
        Estados.SelecionarEstados(false);
    });

    // --------------------- CONDICAO PGTO ------------------------
    // SELECIONAR
    $('#modalCondicoes').on('show.bs.modal', function (e) {
        CondicoesPgto.mostraSelecionarCondicoes();
        CondicoesPgto.CarregaLista($(this));
    });

    $(document).on('click', '.selectCondicao-btn', function () {
        var id = $(this).data('value');
        $("#idCondicaoPgto").val(id);
        CondicoesPgto.fechaModal();
    });

    // ADICIONAR
    $("#btnSalvarAddCondicao").on('click', function () {
        if (CondicoesPgto.validaForm()) {
            $.ajax({
                url: "/CondicaoPgto/JsAddCondicao",
                data: {
                    dsCondicaoPgto : $("#dsCondicaoPgto").val(),
                    vlMulta: $("#vlMulta").val(),
                    vlDesconto : $("#vlDesconto").val(),
                    vlJuros : $("#vlJuros").val(),
                },
                success: function (result) {
                    if (result.success) {

                        var options = result.novaListaCondicoes.map(function (el, i) {
                            return $("<option></option>").val(el.idCondicaoPgto).text(el.dsCondicaoPgto)
                        });

                        $('#idCondicaoPgto').html(options);
                        CondicoesPgto.CarregaLista($("#modalCondicoes"));
                        CondicoesPgto.limpaForm();
                    }
                }
            });
        };
        CondicoesPgto.fechaAddCondicoes();
    });
    $("#btnAddCondicao").on('click', function () {
        CondicoesPgto.mostraAddCondicoes();
    });
    $("#btnEscondeAddCondicao").on('click', function () {
        CondicoesPgto.fechaAddCondicoes();
    });
});

var Cidades = {
    SelecionarCidades(mostra) {
        if (mostra) 
            $(".SelecionaCidade").css("display", "");
        else
            $(".SelecionaCidade").css("display", "none");
    },

    AddCidades(mostra) {
        if (mostra)
            $(".AddCidades").css("display", "");
        else
            $(".AddCidades").css("display", "none");
    },

    validaForm() {
        if (!$("#nmCidade").val()) {
            alert("Digite o nome da Cidade!");
            return false;
        } else if (!$("#idEstado").val()) {
            alert("Digite o Estado da Cidade!");
            return false;
        } else if (!$("#DDD").val()) {
            alert("Digite o DDD da Cidade!");
            return false;
        } else
            return true;
    },

    limpaForm() {
        $("#nmCidade").val("");
        $("#idEstado").val("");
        $("#DDD").val("");
    },

    CarregaLista() {
        let modal = $("#modal");
        let url = "/Cidades/JsSearch";
        $.ajax({
            url: url,
            success: function (result) {
                var tbody = modal.find('#bodyCidades');
                tbody.empty();
                result.forEach(function (cidades) {
                    tbody.append(
                        `
                        <tr>
                            <td scope="row">${cidades.nmCidade}</td>
                            <td>${cidades.nmEstado}</td>
                            <td>${cidades.nmPais}</td>
                            <td style="text-align: right">
                            <button type="button" class="btn btn-sm btn-primary selectCidade-btn" data-value="${cidades.idCidade}" data-name="${cidades.nmCidade}">
                                Selecionar
                            </button>
                            </td>
                        </tr>
                        `
                    );
                });
            }
        });
    },
};

var Estados = {
    SelecionarEstados(mostra) {
        if (mostra)
            $(".SelecionaEstado").css("display", "");
        else
            $(".SelecionaEstado").css("display", "none");
    },

    AddEstados(mostra) {
        if (mostra)
            $(".AddEstados").css("display", "");
        else {
            $(".AddEstados").css("display", "none");
        }
    },

    validaForm() {
        if (!$("#nmEstado").val()) {
            alert("Digite o nome do Estado!");
            return false;
        } else if (!$("#UF").val()) {
            alert("Digite o UF do Estado!");
            return false;
        } else if (!$("#idPais").val()) {
            alert("Digite o Pais do Estado!");
            return false;
        } else
            return true;
    },

    limpaForm() {
        $("#nmEstado").val("");
        $("#UF").val("");
        $("#idPais").val("");
    },

    CarregaLista() {
        let modal = $("#modalCondicoes");
        let url = "/Estados/JsSearch";
        $.ajax({
            url: url,
            success: function (result) {
                var tbody = modal.find('#bodyEstados');
                tbody.empty();
                result.forEach(function (estados) {
                    tbody.append(
                        `
                        <tr>
                            <td scope="row">${estados.idEstado}</td>
                            <td>${estados.nmEstado}</td>
                            <td>${estados.nmPais}</td>
                            <td style="text-align: right">
                            <button type="button" class="btn btn-sm btn-primary selectEstado-btn" data-value="${estados.idEstado}" data-name="${estados.nmEstado}">
                                Selecionar
                            </button>
                            </td>
                        </tr>
                        `
                    );
                });
            }
        });
    }
};

var Paises = {
    SelecionarPaises(mostra) {
        if (mostra)
            $(".SelecionaPais").css("display", "");
        else
            $(".SelecionaPais").css("display", "none");
    },

    AddPaises(mostra) {
        if (mostra)
            $(".AddPais").css("display", "");
        else {
            $(".AddPais").css("display", "none");
        }
    },

    validaForm() {
        if (!$("#nmPais").val()) {
            alert("Digite o nome do Pais!");
            return false;
        } else if (!$("#sigla").val()) {
            alert("Digite a sigla do Pa�s!");
            return false;
        } else if (!$("#DDI").val()) {
            alert("Digite o DDI do Pa�s!");
            return false;
        } else
            return true;
    },

    limpaForm() {
        $("#nmPais").val("");
        $("#sigla").val("");
        $("#DDI").val("");
    },

    CarregaLista() {
        let modal = $("#modal");
        let url = "/Paises/JsSearch";
        $.ajax({
            url: url,
            success: function (result) {
                var tbody = modal.find('#bodyPaises');
                tbody.empty();
                result.forEach(function (paises) {
                    tbody.append(
                        `
                        <tr>
                            <td scope="row">${paises.idPais}</td>
                            <td>${paises.nmPais}</td>
                            <td style="text-align: right">
                            <button type="button" class="btn btn-sm btn-primary selectPais-btn" data-value="${paises.idPais}" data-name="${paises.nmPais}">
                                Selecionar
                            </button>
                            </td>
                        </tr>
                        `
                    );
                });
            }
        });
    },
};

var Endereco = {
    limpaForm() {
        $("#dsLogradouro").val("");
        $("#dsBairro").val("");
        $("#dsComplemento").val("");
    },

    consultaCep(cep) {
        if (cep != "") {
            //Express�o regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep.replace("-", ""))) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#dsLogradouro").val("...");
                $("#dsBairro").val("...");
                $("#dsComplemento").val("...");

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#dsLogradouro").val(dados.logradouro);
                        $("#dsBairro").val(dados.bairro);
                        $("#dsComplemento").val(dados.complemento);
                        let cidade = dados.localidade ?? "";
                        Endereco.buscaCidade(cidade);
                    }
                    else {
                        //CEP pesquisado n�o foi encontrado.
                        Endereco.limpaForm();
                        alert("CEP n�o encontrado.");
                    }
                });
            } else {
                //cep � inv�lido.
                Endereco.limpaForm();
                alert("Formato de CEP inv�lido.");
            }
        } else {
            //cep sem valor, limpa formul�rio.
            Endereco.limpaForm();
        };
    },

    buscaCidade(cidade) {
        $.ajax({
            url: "/Cidades/JsConsultaCidade",
            data: {
                nmCidade: cidade
            },
            success: function (result) {
                if (result.idCidade != null) {
                    $("#idCidade").val(result.idCidade);
                } else {
                    alert("Cidade n�o encontrada no banco de dados do Sistema!");
                };
            }
        });
    }
};

var CondicoesPgto = {
    mostraSelecionarCondicoes() {
        $(".AddCondicoes").css("display", "none");
        $(".SelecionaCondicoes").css("display", "");
    },

    mostraAddCondicoes() {
        $(".AddCondicoes").css("display", "");
        $(".SelecionaCondicoes").css("display", "none");
    },

    fechaAddCondicoes() {
        Paises.limpaForm();
        $(".AddCondicoes").css("display", "none");
        $(".SelecionaCondicoes").css("display", "");
    },

    fechaModal() {
        $("#btnFechaModalCondicao").click();
    },

    validaForm() {
        if (!$("#dsCondicaoPgto").val()) {
            alert("Digite a descri��o da Condi��o de Pgto!");
            return false;
        } else if (!$("#vlMulta").val()) {
            alert("Digite o valor da multa!");
            return false;
        } else if (!$("#vlDesconto").val()) {
            alert("Digite o valor do desconto!");
            return false;
        } else if (!$("#vlJuros").val()) {
            alert("Digite o valor do juros!");
            return false;
        } else
            return true;
    },

    limpaForm() {
        $("#dsCondicaoPgto").val("");
        $("#vlMulta").val("");
        $("#vlDesconto").val("");
        $("#vlJuros").val("");
    },

    CarregaLista(modal) {
        $.ajax({
            url: "/CondicaoPgto/JsSearch",
            success: function (result) {
                var tbody = modal.find('#bodyCondicaoPgto');
                tbody.empty();
                result.forEach(function (condicoes) {
                    tbody.append(
                        `
                        <tr>
                            <td scope="row">${condicoes.idCondicaoPgto}</td>
                            <td>${condicoes.dsCondicaoPgto}</td>
                            <td>${condicoes.vlMulta}</td>
                            <td>${condicoes.vlDesconto}</td>
                            <td>${condicoes.vlJuros}</td>
                            <td style="text-align: right">
                            <button type="button" class="btn btn-sm btn-primary selectCondicao-btn" data-value="${condicoes.idCondicaoPgto}" data-name="${condicoes.dsCondicaoPgto}">
                                Selecionar
                            </button>
                            </td>
                        </tr>
                        `
                    );
                });
            }
        });
    }
};
