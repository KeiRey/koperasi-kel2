<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {

        $history = Transaction::when(request()->search, function ($products) {
            $products = $products->where('invoice', 'like', '%' . request()->search . '%');
        })->with([
                    'cashier',
                    'customer',
                    'details.product'
                ])
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        //return inertia
        return Inertia::render('Dashboard/History/Index', [
            'history' => $history,
        ]);
    }
}
