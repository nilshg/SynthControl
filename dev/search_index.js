var documenterSearchIndex = {"docs":
[{"location":"methods/SyntheticDiD/#Synthetic-Difference-in-Differences-Estimator","page":"SyntheticDiD","title":"Synthetic Difference-in-Differences Estimator","text":"","category":"section"},{"location":"methods/SyntheticDiD/#Implementation-in-SynthControl","page":"SyntheticDiD","title":"Implementation in SynthControl","text":"","category":"section"},{"location":"methods/SyntheticDiD/","page":"SyntheticDiD","title":"SyntheticDiD","text":"The Implementation of the estimator follows the reference implementation in the R package synthdid. ","category":"page"},{"location":"methods/PenalizedSCM/#Penalized-Synthetic-Control-Model","page":"PenalizedSCM","title":"Penalized Synthetic Control Model","text":"","category":"section"},{"location":"methods/PenalizedSCM/","page":"PenalizedSCM","title":"PenalizedSCM","text":"Proposed by Abadie and L'Hour (2021)[1]","category":"page"},{"location":"methods/PenalizedSCM/#Implementation-in-SynthControl","page":"PenalizedSCM","title":"Implementation in SynthControl","text":"","category":"section"},{"location":"methods/PenalizedSCM/","page":"PenalizedSCM","title":"PenalizedSCM","text":"[to follow]","category":"page"},{"location":"methods/PenalizedSCM/","page":"PenalizedSCM","title":"PenalizedSCM","text":"[1]: Abadie, A. and L'Hour, J. (2021): A Penalized Synthetic Control Estimator for Disaggregated Data, Journal of the American Statistical Association, Vol. 116","category":"page"},{"location":"methods/AugmentedSCM/#Augmented-Synthetic-Control-Model","page":"AugmentedSCM","title":"Augmented Synthetic Control Model","text":"","category":"section"},{"location":"methods/AugmentedSCM/","page":"AugmentedSCM","title":"AugmentedSCM","text":"Proposed by Ben-Michael et al. (2021, JASSA)[1]","category":"page"},{"location":"methods/AugmentedSCM/#Implementation-in-SynthControl","page":"AugmentedSCM","title":"Implementation in SynthControl","text":"","category":"section"},{"location":"methods/AugmentedSCM/","page":"AugmentedSCM","title":"AugmentedSCM","text":"[to follow]","category":"page"},{"location":"methods/AugmentedSCM/","page":"AugmentedSCM","title":"AugmentedSCM","text":"[1]: Ben-Micheal, E., Feller, A., and Rothstein, J. (2021): The Augmented Synthetic Control Method, Journal of the American Statistical Association, Vol. 116","category":"page"},{"location":"sc_intro/#Introduction-to-Synthetic-Control-Models","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Control Models","text":"","category":"section"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"Synthetic Control Models are a class of causal inference models first introduced in Abadie and Gardeazabal (2003)[1]. They infer causal effects of treatments by creating a \"synthetic\" comparator unit as a weighted average of the untreated observations to impute the missing potential outcomes for the treated unit in the post-treatment period.","category":"page"},{"location":"sc_intro/#Basic-setup","page":"Introduction to Synthetic Controls","title":"Basic setup","text":"","category":"section"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"The notation throughout the documentation (and, to the extent possible, the source code implementing the various methods in this package) broadly follows Arkhangelsky and Imbens (2023)[2]. We observe i = 1 2  N units for t = 1 2  T periods. Outcomes are recorded in the (N times T) matrix Y:","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"Y = beginpmatrix\n    Y_11  Y_1 2  cdots  Y_1 T \n    Y_21  ddots            vdots   \n    vdots              ddots vdots   \n    Y_N1  cdots    cdots        Y_N T   \n    endpmatrix_(N times T)","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"In every period, each unit can either be treated or untreated, with treatment status denoted by a binary indicator W_it in 01. A number N_tr units in the population are then exposed to a treatment, leaving N_co untreated units as poential comparator or control units. In the simplest case, only one unit is treated at a point in time T_0, so that the observation window can be divided into two parts: T_pre equiv 1 2  T_0 and T_post equiv T_0 + 1 T_0 + 2  T. ","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"In potential outcome notation, each unit has two potential outcomes at each point in time, Y_it(0) if untreated and Y_it(1) if treated. The causal effect of treatment is defined as the difference between these two outcomes:","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"tau_it equiv Y_it(1) - Y_it(0)","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"As by construction only one of these outcomes is actually observable, the aim of causal inference is to impute the missing outcome; in the case of treated units we are therefore looking to estimate the outcome that would have obtained had the unit not been treated. ","category":"page"},{"location":"sc_intro/#The-synthetic-control","page":"Introduction to Synthetic Controls","title":"The synthetic control","text":"","category":"section"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"The synthetic control approach to solving the problem of imputing an unobserved potential outcome was inspired by the comparative case studies often used in social sciences. In these comparative case studies, the evolution of an outcome over time in a treated unit of interest (e.g. a country) is compared to that of another treated unit that is somehow similar to the treated unit along some relevant dimensions - essentially a form of matchin estimator. ","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"In practice however there often is not a single comparator unit which adequately approximates the treated unit on the characteristica of interest, casting doubt on the validity of a simple unit-to-unit comparison. Synthetic control methods address this issue by creating a synthetic control unit which can be compared to the treated unit in such a way that its characteristics closely resemble those of the treated unit.","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"Formally, let X_i p denote an (N times p) matrix of p covariates (which can contain pre-treatment outcomes) measured for each of the N observed units, and let omega denote an (N_co times 1) vector of weights for each untreated unit. Synthetic control methods find the weights omega by solving an optimization problem of the form ","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"omega^* = arg min_omega X_tr cdot - X_co cdotomega_2","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"Generally, this optimization problem is constrained in some way, e.g. by requiring the weights omega to lie between 0 and 1 for each unit and to sum to 1 across all control units, with different synthetic control estimators differing in their exact specification of this optimization problem and its constraints. ","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"With the optimal weights omega^* in hand, imputation of the missing potential outcomes for the treated unit is done by simply calculating the average outcome across control units, weighted by omega^*:","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"hattau_sc = Y_tr T_post - Y_co T_postomega^*","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"[1]: Abadie, A., and Gardeazabal, J. (2003): The Economic Cost of Conflict: A Case Study of the Basque Country, American Economic Review, Vol. 93(1), Pp. 113-132","category":"page"},{"location":"sc_intro/","page":"Introduction to Synthetic Controls","title":"Introduction to Synthetic Controls","text":"[2]: Arkhangelsky, D., and Imbens, G. (2023): Causal Models for Longitudinal and Panel Data: A Survey, arXiv:2311.15458","category":"page"},{"location":"methods/ADH2010/#Abadie,-Diamond-and-Hainmüller-(2010)-Synthetic-Control-Model","page":"ADH2010","title":"Abadie, Diamond and Hainmüller (2010) Synthetic Control Model","text":"","category":"section"},{"location":"methods/ADH2010/","page":"ADH2010","title":"ADH2010","text":"The ADH2011 model is in some sense the canonical Synthetic Control Model. It is set out in Abadie, Diamond and Hainmüller (2010, JASSA)[1], which estimates the effects of proposition 99, a change to tobacco advertising rules in California, on smoking rates in the state. ","category":"page"},{"location":"methods/ADH2010/","page":"ADH2010","title":"ADH2010","text":"The method was initially introduced in Abadie and Gardeazabal (2003)[2].  ","category":"page"},{"location":"methods/ADH2010/","page":"ADH2010","title":"ADH2010","text":"[1]: Abadie, A., Diamond, A., and Hainmüller, J. (2010): Synthetic Control Methods for Comparative Case Studies: Estimating the Effect of California’s Tobacco Control Program, American Journal of Political Science, Vol. 59(2), Pp. 495-510","category":"page"},{"location":"methods/ADH2010/","page":"ADH2010","title":"ADH2010","text":"[2]: Abadie, A., and Gardeazabal, J. (2003): The Economic Cost of Conflict: A Case Study of the Basque Country, American Economic Review, Vol. 93(1), Pp. 113-132","category":"page"},{"location":"methods/MC-NNM/#Matrix-Completion-with-Nuclear-Norm-Minimization","page":"MC-NNM","title":"Matrix Completion with Nuclear Norm Minimization","text":"","category":"section"},{"location":"methods/MC-NNM/","page":"MC-NNM","title":"MC-NNM","text":"The Matrix Completion with Nuclear Norm Minimization estimator was proposed by Athey et al. (2021, JASSA)[1].","category":"page"},{"location":"methods/MC-NNM/#Implementation-in-SynthControl","page":"MC-NNM","title":"Implementation in SynthControl","text":"","category":"section"},{"location":"methods/MC-NNM/","page":"MC-NNM","title":"MC-NNM","text":"!!! Note","category":"page"},{"location":"methods/MC-NNM/","page":"MC-NNM","title":"MC-NNM","text":"The implementation is adapted from that in the R package [`fect`](https://github.com/xuyiqing/fect/) and should currently be seen as experimental.","category":"page"},{"location":"methods/MC-NNM/","page":"MC-NNM","title":"MC-NNM","text":"[1]: Susan Athey, Mohsen Bayati, Nikolay Doudchenko, Guido Imbens & Khashyar Khosravi (2021): Matrix Completion Methods for Causal Panel Data Models, Journal of the American Statistical Association, Vol. 116","category":"page"},{"location":"#SynthControl.jl","page":"Home","title":"SynthControl.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia package for estimating causal effects via synthetic control estimators","category":"page"},{"location":"#Package-Overview","page":"Home","title":"Package Overview","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SynthControl aims to provide a wide coverage of synthetic control estimators, written in pure Julia. The package is under development, with new estimators and options for statistical inference added. Where possible, estimators are implemented following reference implementations by the original authors.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The following table provides an overview of the planned scope of the package as well as current implementation status ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Estimator Point estimate Covariates Standard Errors Reference implementation\nSimple SCM 🟢 🟥 🟡 None\nADH2010 🟡 🟥 🟥 None\nSyntheticDiD 🟢 🟥 🟡 synthdid (R)\nPenalizedSCM 🟥 🟥 🟥 pensynth (R)\nAugmentedSCM 🟥 🟥 🟥 augsynth (R)\nMC-NNM 🟡 🟥 🟥 fect (R)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Contributions to add methods to the package scope - or even better, full implementations! - are very much welcome.","category":"page"},{"location":"#Documentation-outline","page":"Home","title":"Documentation outline","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#API","page":"Home","title":"API","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SimpleSCM\nSyntheticDiD\nfit!\nisfitted","category":"page"},{"location":"#SynthControl.SimpleSCM","page":"Home","title":"SynthControl.SimpleSCM","text":"SimpleSCM\n\nTakes in a TreatmentPanel and holds the results of calling the fit! method, optimal weights for comparator units and the resulting predicted outcome of the synthetic control unit as well as the estimated treatment effect from comparing synthetic control and observed outcome of the treated unit.\n\n\n\n\n\n","category":"type"},{"location":"#SynthControl.SyntheticDiD","page":"Home","title":"SynthControl.SyntheticDiD","text":"SyntheticDiD\n\nSynthetic Differences-in-Differences (SDID) estimator as described in Arkhangelsky et al. (2021). SDID is defined as \n\nμ̂, α̂, β̂, τ̂ = argmin ∑ₙ∑ₜ(Yᵢₜ - μ - αᵢ - βₜ - Wᵢₜτ)²ω̂ᵢλ̂ₜ\n\nwhere i = 1, 2, ..., N denotes the observation units in the panel, t = 1, ..., T denotes the time periods, Y is an (N×T) matrix of outcomes, W is an (N×T) indicator matrix of treatment status, ω is a unit weight and λ is a time period weight. \n\nThe implementation follows the author's reference implementation in the R package synthdid, published by the authors under a BSD-3 license at https://github.com/synth-inference/synthdid/\n\nNOTE: The implementation assumes that the outcomes and treatment matrices are sorted such that treated units come last in both Y and W. It therefore checks whether W is sorted and swaps rows in both Y and W to sort both matrices accordingly if required. \n\n\n\n\n\n","category":"type"},{"location":"#SynthControl.fit!","page":"Home","title":"SynthControl.fit!","text":"fit!(s::SimpleSCM; placebo_test = false)\n\nFit the SimpleSCM s by finding the weights that minimize the distance between the pre-treatment outcomes for the observational unit of interest and the weighted average pre-treatment outcomes for unweighted units.\n\nIf placebo_test = true is supplied, additional placebo tests will be performed by using every non-treated unit in the data set as the treated unit in turn and estimating the treatment impact on this unit. Results are stored in the p_test_res field and can be used as the basis for inference.\n\n\n\n\n\n","category":"function"},{"location":"#SynthControl.isfitted","page":"Home","title":"SynthControl.isfitted","text":"isfitted(s::SimpleSCM)\n\nCheck whether the SimpleSCM object s has been fitted.\n\nExamples\n\njulia> df = load_brexit();\n\njulia> s = SimpleSCM(df, :country, :dateid, :realgdp, 86, \"United Kingdom\");\n\njulia> isfitted(s)\nfalse\n\njulia> fit!(s);\n\njulia> isfitted(s)\ntrue\n\n\n\n\n\n\n","category":"function"},{"location":"methods/SimpleSCM/#Simple-Synthetic-Control-Model","page":"SimpleSCM","title":"Simple Synthetic Control Model","text":"","category":"section"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"This method captures the simple-most version of a Synthetic Control Model. It only relies on outcome data Y_it and treatment indicators W_it to find unit-weights omega_i by solving","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"omega^* = arg min_omega  Y_tr 1T_0 - omega Y_co 1T_0 _2 \nst sum_i = 1^N_co omega_i = 1 \n0 leq omega_i leq 1  forall  i in 1  N_co","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"where Y_tr cdot is a length T_0 vector of pre-treatment outcomes for the treated unit, Y_co 1T_0 is a (N_co times T_0) matrix of pre-treatment outcomes for the N_co control units and omega is a length N_co vector of weights for each control unit. Weights are restricted to lie between zero and one for each control unit and to sum up to one, as in Abadie and Gardeazabal (2003). ","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"The SimpleSCM method can therefore be seen as a simplified version of the Abadie and Gardeazabal (2003) or Abadie, Diamond and Hainmüller (2011) Synthetic Control Model, with the following differences:","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"Only past outcomes are being used to find weights, no other covariate information is taken into account;\nThere is no weighting of covariates (i.e., past outcomes) - in the original Abadie/Gardeazabal notation, the diagonal matrix V which weigts covariates is the identity matrix. ","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"Despite these limitations, the results from this simple procedure can often be close to those of the more fully featured ADH2010 model, as shown in the example below. ","category":"page"},{"location":"methods/SimpleSCM/#Implementation-in-SynthControl","page":"SimpleSCM","title":"Implementation in SynthControl","text":"","category":"section"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"The simple SCM model can be estimated by passing a TreatmentPanel to the SimpleSCM constructor. The following example estimates the effect of California's proposition 99 on cigarette sales, an application taken from Abadie, Diamond and Hainmüller (2010, JASSA)[1].","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"First, we load the relevant data:","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"julia> using SynthControl\n\njulia> smoking_panel = load_smoking_panel()\nBalanced Panel - single treated unit, continuous treatment\n    Treated unit: 3\n    Number of untreated units: 38\n    First treatment period: 1989\n    Number of pretreatment periods: 19\n    Number of treatment periods: 12","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"Then we create the SimpleSCM model and call fit! on the model instance:","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"julia> simple_scm = SimpleSCM(smoking_panel);\n\njulia> fit!(simple_scm)\nSynthetic Control Model\n\nTreatment panel:\nBalanced Panel - single treated unit, continuous treatment\n    Treated unit: 3\n    Number of untreated units: 38\n    First treatment period: 1989\n    Number of pretreatment periods: 19\n    Number of treatment periods: 12\n\n        Model is fitted\n        Impact estimates: [-8.44, -9.207, -12.634, -13.729, -17.534, -22.049, -22.858, -23.997, -26.261, -23.338, -27.52, -26.597]\n        ATT: -19.514","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"The average treatment effect on the treated (ATT) is simply the average of the imputed synthetic control outcomes for the post-treatment periods:","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"julia> using Statistics\n\njulia> mean(simple_scm.τ̂)\n-19.51362976399461","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"To esimate standard errors, an optional placebo test can be run in which a treatment effect is estimated for the post-treatment period for each of the untreated units in turn, with the treated unit excluded from the donor pool. ","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"julia> fit!(simple_scm; placebo_test = true)","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"Where the placebo test has been run, the p_test_res field of the SimpleSCM object holds the estimated post-treatment outcomes for each untreated unit. ","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"The standard deviation of the treatment effects for other units can serve as an estimator of the standard error of the treatment effect:","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"julia> √(var(mean.(eachrow(sscm.p_test_res))))\n10.776022984492037","category":"page"},{"location":"methods/SimpleSCM/","page":"SimpleSCM","title":"SimpleSCM","text":"[1]: Abadie, A., Diamond, A., and Hainmüller, J. (2010): Synthetic Control Methods for Comparative Case Studies: Estimating the Effect of California’s Tobacco Control Program, American Journal of Political Science, Vol. 59(2), Pp. 495-510","category":"page"}]
}
