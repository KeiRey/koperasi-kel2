<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Profit;
use Illuminate\Http\Request;

use App\Models\Transaction;
use Inertia\Inertia;

class ProfitController extends Controller
{
    public function index()
    {
        $profit = Profit::when(request()->search, function ($query) {
            $query->whereHas('transaction', function ($transactionQuery) {
                $transactionQuery->where('invoice', 'like', '%' . request()->search . '%');
            });
        })
        ->with('transaction')
        ->orderBy('created_at', 'desc')
        ->paginate(5);

        return Inertia::render('Dashboard/Profit/Index', [
            'profit' => $profit,
        ]);
    }
}
