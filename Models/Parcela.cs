﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sistema.Models
{
    public class Parcela
    {
        [Key]
        [Column(Order = 0)]
        public int idCondicaoPgto { get; set; }
        [Key]
        [Column(Order = 1)]
        public int idFormaPgto { get; set; }
        [Display(Name = "Dias")]
        public string dias { get; set; }
        [Display(Name = "% Parcela")]
        public decimal txPercentParcela { get; set; }
        [Display(Name = "% Juros")]
        public decimal txPercentJuros { get; set; }
        [Display(Name = "% Multa")]
        public decimal txPercentMulta { get; set; }
        [Display(Name = "% Desconto")]
        public decimal txPercentDesconto { get; set; }
        [Display(Name = "Data de cadastro")]
        public DateTime? dtCadastro { get; set; }

        [Display(Name = "Data da últ. alteração")]
        public DateTime? dtUltAlteracao { get; set; }
    }
}
